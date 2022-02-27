require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Path = require("path");
const auth = require("./middelware/auth");
const privacy = require("./middelware/pictures/privacy");
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

//app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

//routers

// app.use(new express.Router(), "/api/user");

//Todo: gucken für was die scheiße war
//app.use(privacy);
app.use(auto);
app.use("/api/", basic);
app.use("/api/", article);

// static routes

app.use("/api/", auth, privacy, express.static("public"));

app.get("/api/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
