require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Path = require("path");
const auth = require("./middelware/auth");
<<<<<<< HEAD
const priv = require("./middelware/pictures/privacy");

=======
const privacy = require("./middelware/pictures/privacy");
>>>>>>> 472481ec6c0829591b7b75907b69c8f5cbf28d3b
//router import
const auto = require("./routers/auth0");
const basic = require("./routers/artikel/basic");
const article = require("./routers/artikel/userArtikel/me");
const cookieParser = require("cookie-parser");

//important static paths

process.env.ArticlePicturePath = Path.join(
  __dirname,
  "../public/ArticlePhotos/"
);

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

//routers

// app.use(new express.Router(), "/api/user");
app.use(priv);
app.use(auto);
app.use("/api/", basic);
app.use("/api/", article);

// static routes

app.use("/api/", auth, privacy, express.static("public"));

app.get("/api/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
