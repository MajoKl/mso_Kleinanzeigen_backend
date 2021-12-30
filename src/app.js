require("dotenv").config();
const express = require("express");
const cors = require("cors");

//auth 0

const { auth } = require("express-openid-connect");

//router import
const auto = require("./routers/auth0");
const me = require("./routers/users/me");
const app = express();

app.use(
  auth({
    issuerBaseURL: "http://localhost:3000/",
    baseURL: "http://localhost",
    authRequired: false,
    auth0Logout: true,
  })
);

//app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routers

app.use("/api/user", me);
app.use(auto);

app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

app.get("/", (req, res) => {
  res.send({ error: "Du bist komisch" });
});

module.exports = app;
