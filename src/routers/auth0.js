const express = require("express");
const axios = require("axios");

const User = require("../models/User");

const router = new express.Router();

const CLIENT_ID = process.env.OAuth_CLIENT_ID;
const CLIENT_SECRET = process.env.OAuth_CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.get("/oauth/redirect", async (req, res) => {
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
       
       if(response.data.login == null ) delete response.data.login
       
        let user = await User.findOne({
          login:response.data.login, 
          id:response.data.id 
        });
        console.log(user)
        if (!user) {
          try {
            const data = {
              name: response.data.login,
              sit: response.data.id,
              grade: response.data.grade || "class2002d",
            };
            const hä = new User({ ...data });
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
        res.cookie("auth_token", token ,{domain: "jonaslbgtt.live"});
        return res.redirect(process.env.FRONENDURL || "http://127.0.0.1:3000");
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send({ error });
      });
  });
});

module.exports = router;
