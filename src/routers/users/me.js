const { Router } = require("express");
const { model } = require("mongoose");
const auth = require("../../middelware/auth");
const User = require("../../models/User");

const router = Router();

router.get("/me", auth, async (req, res) => {
  try {
    const usrInfo = await User.findOne({ _id: req.user._id });

    return res.send(usrInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
});

router.put("/me/update", auth, async (req, res) => {
  if (req.body.role)
    return res.status(400).send({ error: "You cant update your own role." });

  try {
    Object.keys(req.body).forEach((key) => {
      req.user[key] = req.body[key];
    });

    await req.user.save();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/me/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    return res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/me/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
