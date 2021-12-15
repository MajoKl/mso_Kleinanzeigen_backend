const express = require("express");
const cors = require("cors");

//router import
const me = req;
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routers

app.use();

app.get("/api/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
