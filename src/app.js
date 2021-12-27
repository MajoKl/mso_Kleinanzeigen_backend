require("dotenv").config();
const express = require("express");
const cors = require("cors");

//router import
const auto = require("./routers/auth0");
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routers

// app.use(new express.Router(), "/api/user");
app.use(auto);

app.get("/api/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
