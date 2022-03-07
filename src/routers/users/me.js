const { Router } = require("express");
const { model } = require("mongoose");
const auth = require("../../middelware/auth");
const User = require("../../models/User");

const router = Router();

router.get("/me", auth, async (req, res) => {
  console.log(req.user + "prrrrrrreeeeeeeeeee");
  try {
    const usrInfo = await User.findOne({ _id: req.user._id }).accessibleBy(
      req.user.abb
    );

    console.log(usrInfo);
    return res.send(usrInfo);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
