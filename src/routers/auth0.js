const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = new express.Router();

const CLIENT_ID = process.env.OAuth_CLIENT_ID;
const CLIENT_SECRET = process.env.OAuth_CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.cookies["auth_token"] = response.data;

    console.log(response.data);

    res.redirect(
      `http://localhost:3000/start?access_token=${response.data.access_token}`
    );
  });
});

module.exports = router;
