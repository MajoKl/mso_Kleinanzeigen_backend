require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
//router import
const auto = require("./routers/auth0");
const basic = require("./routers/artikel/basic");
const article = require("./routers/artikel/userArtikel/me");
const cookieParser = require("cookie-parser");

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

//routers

// app.use(new express.Router(), "/api/user");
app.use(auto);
app.use("/api/", basic);
app.use("/api/", article);

app.get("/api/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
