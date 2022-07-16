const Article = require("../../models/Article");

privaty = async (req, res, next) => {
  const artid = req.url.split("/")[2];

  try {
    const article = await Article.findOne({ _id: artid })
      .select({ private: 1, pictures: 1, owner: 1 })
      .exec();

    article.populate({ path: "owner" });

    if (article.owner.private) return res.status(400).send();

    if (!article.private) return next();

    if (req.user._id === article.owner) return next();

    res.status(400).send();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = privaty;
