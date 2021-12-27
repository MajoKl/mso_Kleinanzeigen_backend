const express = require("express");
const cors = require("cors");

//router import
const me = req;
require("dotenv").config();

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routers

app.use(express.Route(), "/api/user");

app.get("/api/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
