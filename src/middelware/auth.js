const User = require("../models/User");

const jwt = require("jsonwebtoken");

//https://www.udemy.com/share/101WGi3@k9oZBiVXc624vm37E6HCDydxQnuEq6GziBVA8otebQ_VUYhKwcJkDAU_OhywcYLFbw==/
//aber von mir modified, so das alles über cookies läuft
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
    return res.status(401).send({ error: "Please sign in again" });
    
  }
};

module.exports = auth;
