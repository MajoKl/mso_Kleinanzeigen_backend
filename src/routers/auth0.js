const express = require("express");

const router = express.Router();

const CLIENT_ID = "e01038b01f2f337f50a8";
const CLIENT_SECRET = "35861282d86dd004044b42c9c897bd73646b0b16";
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
