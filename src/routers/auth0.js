const express = require("express");

const router = express.Router();

const CLIENT_ID 
const CLIENT_SECRET = proccess.env.
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:3000?access_token=${response.data.access_token}`
    );
  });
});

module.exports = router;
