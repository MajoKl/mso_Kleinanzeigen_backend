require("dotenv").config();
require("./utils/informationgetter/cronjobs")
const express = require("express");
const cors = require("cors");
const app = express();
const Path = require("path");
const auth = require("./middelware/auth");
const privacy = require("./middelware/pictures/privacy");
//router import

const auto = require("./routers/auth0");
const routs = require("./routers/routs");

const logger = require("./middelware/logger/logging")

const cookieParser = require("cookie-parser");

const coreopentions = {

  origin: "http://dev_frontend.jonaslbgtt.live:3005",
  //allowedHeaders:["Authorization","Cookies"]
  credentials:true,
  preflightContinue: false,
  
}

app.use(cors(coreopentions))


 

//important static paths

process.env.ArticlePicturePath = Path.join(
  __dirname,
  "../public/ArticlePhotos/"
);




app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

//routers

// app.use(new express.Router(), "/api/user");

//Todo: gucken für was die scheiße war
//app.use(privacy);
app.use(logger)
app.use(auto);
app.use("/api", routs);
// static routes

app.use("/api/", auth, privacy, express.static("public"));

app.get("/api", (req, res) => {
  res.send({ error: "Hello world!" });
});

module.exports = app;
