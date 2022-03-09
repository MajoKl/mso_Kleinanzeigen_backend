const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Article = require("../../models/Article");
const Path = require("path");
const Sharp = require("sharp");
const { getSystemErrorMap } = require("util");

const router = new express.Router();

const upload = multer({
  limits: {
    fieldSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be a .jpg, .jpeg, .png"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/pictures/upload",
  auth,
  upload.single("pic"),
  async (req, res) => {
    const file = req.file;
    req.query.name = req.query.name + ".png";
    const { name, article_id } = req.query;

    if (!file)
      return res
        .status(400)
        .send({ error: "Please attach a file to your reqest to use this" });
    try {
      const article = await Article.findOne({
        _id: article_id,
        owner: req.user._id,
      });

      if (!article)
        return res
          .status(404)
          .send({ error: "This article does not exist for this user" });

      if (req.user.abb.cannot("update", "Article"))
        return res.status(404).send();
      if (name.length > 24)
        return res.status(400).send({
          Error: `Name ist to long. Please enter a name with less than 20 characters`,
        });

      if (
        article.pictures.filter((f) => {
          return f.name === name;
        }).length > 0
      )
        return res.status(400).send({
          Error: `File does exist. Please user an other name than "${name}"`,
        });

      const path = Path.join(
        process.env.ArticlePicturePath,

        article.id
      );

      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

      file.buffer = await Sharp(file.buffer).png().toBuffer();

      fs.writeFileSync(Path.join(path, `${name}`), file.buffer);

      article.pictures.push({ path, name: `${name}` });

      await article.save();

      return res.status(200).send();
    } catch (e) {
      console.log(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/pictures", auth, async (req, res) => {
  const ArticleID = req.query.article_id;

  if (req.user.abb.cannot("read", "Article"))
    res
      .status(404)
      .send({ Error: "You are not allowed to to perforem this action." });

  try {
    const article = await Article.findOne({ _id: ArticleID });

    if (!article) res.status(400).send({ Error: "Article not found." });

    // if (!pictures) return res.status(404).send({ Error: "Article not found." });

    const pictures = article.pictures || [];

    return res.send(pictures);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/pictures", auth, async (req, res) => {
  article_id = req.query.article_id;
  pictures = req.query.pictures.split(";");

  try {
    const article = await Article.findOne({ _id: article_id });

    pictures.forEach((element) => {
      console.log(
        fs.existsSync(process.env.ArticlePicturePath, article_id, element)
      );
      if (fs.existsSync(process.env.ArticlePicturePath, article_id, element)) {
        try {
          fs.rmSync(
            Path.join(process.env.ArticlePicturePath, article_id, element)
          );
        } catch (error) {}
      }

      article.pictures = article.pictures.filter((pic) => pic.name !== element);
    });

    await article.save();
    res.send(article.pictures);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
