const { permittedFieldsOf } = require("@casl/ability/extra");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

auth = async (req, res, next) => {
  const token = req.cookies["auth_token"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error("You are unautherized!");
    user.abb = user.generateAbblilities();

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Please sign in again" });
  }
};

module.exports = auth;
