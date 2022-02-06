const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Article = require("../../models/Article");
const Path = require("path");

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

      if (req.user.abb.can("update", "Article")) fs.writeFileSync(file);

      if (name.length > 20)
        return res.status(400).send({
          Error: `Name ist to long. Please enter a name with less than 20 characters`,
        });

      if (article.pictures.filter((f) => f.name === name).length > 0)
        return res.status(400).send({
          Error: `File does exist. Please user an other name than "${name}"`,
        });

      const path = Path.join(
        __dirname,
        `../../../public/ArtiklePhotos/${article.id}`
      );

      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

      fs.writeFileSync(Path.join(path, `${name}.png`), file.buffer);

      return res.status(200).send();
    } catch (e) {
      console.log(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
