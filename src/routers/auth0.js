const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = new express.Router();

const CLIENT_ID = process.env.OAuth_CLIENT_ID;
const CLIENT_SECRET = process.env.OAuth_CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/oauth/redirect", async (req, res) => {
  console.log(req.query);
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    axios({
      method: "GET",
      url: "https://api.github.com/user",
      headers: {
        Accept: "application/json",
        Authorization: "token " + response.data.access_token,
      },
    })
      .then(async (response) => {
        const user = await User.find({
          login:
            response.data.login || "Permission denied function fuck this user",
          id: response.data.id,
        });

        if (!user.length != 0) {
          try {
            newuser = new User({
              name: response.data.login,
              id: response.data.id,
              grade: response.data.grade || "Waiting for k",
            });

            res.cookie("auth_token", await user.genenerateAuthToken());
          } catch (error) {
            console.error(error);
            return res.status(404).send({ error });
          }
        }

        res.cookie("auth_token", user.genenerateAuthToken());
        return res.redirect(
          `http://localhost:3005/start?access_token=${response.data.access_token}`
        );
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  });
});

module.exports = router;
