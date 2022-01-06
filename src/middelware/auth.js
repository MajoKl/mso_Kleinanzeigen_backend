const jwt = require("jsonwebtoken");

auth = async function (req, res, next) {
  try {
    const token = req.cookies["auth_token"];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    const rediURI = process.env.URI || "http://localhost:3005";
    res.redirect(`${rediURI}/login`);
  }
};
