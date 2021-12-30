const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = new express.Router();

const CLIENT_ID = process.env.OAuth_CLIENT_ID;
const CLIENT_SECRET = process.env.OAuth_CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/oauth/redirect", (req, res) => {
  console.log("**" + JSON.stringify(req.form));
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}&grant_type="authorization_code"&redirect_uri=http://localhost:3000/oauth/redirect`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    console.log(`#${JSON.stringify(response.data)}`);
    res.redirect(
      `http://localhost:3005/start?access_token=${response.data.access_token}`
    );
  });
});

router.post("/oauth/redirect", (req, res) => {
  console.log("what");
  console.log(req.body);
  res.statuscode(200);
});

module.exports = router;
