const Article = require("../auth");

const private = async (req, res, next) => {
  console.log(req.url);

  next();
};

module.exports = private;
