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
  "/pictures/upload/",
  auth,
  upload.single("pic"),
  async (req, res) => {
    const file = req.file;
    const { name, article_id } = req.query;
    console.log(`${name} uploaded to ${article_id}`);
    try {
      const article = await Article.findOne({ _id: article_id });

      if (req.user.abb.cannot("update", "Article"))
        return res.status(404).send();
      if (name.length > 20)
        return res.status(400).send({
          Error: `Name ist to long. Please enter a name with less than 20 characters`,
        });

      if (article.pictures.filter((f) => f.name === name).length > 0)
        return res.status(400).send({
          Error: `File does exist. Please user an other name than "${name}"`,
        });

      const path = Path.join(
        process.env.ArticlePicturePath,

        article.id
      );

      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

      file.buffer = await Sharp(file.buffer).png().toBuffer();

      fs.writeFileSync(Path.join(path, `${name}.png`), file.buffer);

      article.pictures.push({ path, name: `${name}.png` });

      await article.save();

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      console.log("Yeeee Jonas ist ein absturz 12er!!");
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/pictures", auth, async (req, res) => {
  const { ArticleID, Pictures } = req.body;

  if (req.user.abb.cannot("read", "Article"))
    res
      .status(404)
      .send({ Error: "You are not allowed to to perforem this action." });

  try {
    const pictures = await Article.findOne({ _id: ArticleID }).pictures;
    if (!pictures) return res.status(404).send({ Error: "Article not found." });

    return res.send(pictures);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
