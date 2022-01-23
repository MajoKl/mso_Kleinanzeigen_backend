const express = require("express");
const multer = require("multer");

const router = new express.Router();

const upload = multer({
  limits: {
    fieldSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be a jpg jpeg png"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/pictures/upload",
  auth,
  upload.single(),
  (req, res) => {
    const file = req.file;
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
