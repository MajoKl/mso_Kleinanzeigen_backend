const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = new express.Router();

const CLIENT_ID = process.env.OAuth_CLIENT_ID;
const CLIENT_SECRET = process.env.OAuth_CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/oauth/redirect", async (req, res) => {
  console.log(req.query);
  console.log(req.headers["x-forwarded-for"]);
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
        let user = await User.find({
          login:
            response.data.login || "Permission denied function fuck this user",
          id: response.data.id,
        });

        if (!user.length != 0) {
          console.log("this shit");
          try {
            const data = {
              name: response.data.login,
              sit: response.data.id,
              grade: response.data.grade || "class2002d",
            };
            const hä = new User({ ...data, role: undefined });
            await hä.save();
            console.log(hä);
            user = hä;
          } catch (error) {
            console.error(error);
            return res.status(404).send({ error });
          }
        }

        if (user.length) user = user[0];

        const token = await user.generateAuthToken();
        res.cookie("auth_token", token);
        return res.redirect(`http://localhost:3005/`);
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send({ error });
      });
  });
});

module.exports = router;
