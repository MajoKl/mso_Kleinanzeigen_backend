const Article = require("../auth");

const private = async (req, res, next) => {
  const artid = req.url.split("/")[2];

  try {
    const article = await Article.findById({ _id: artid })
      .select({ private: 1, pictures: 1, owner: 1 })
      .exec();

    if (!article.private) next();

    if (req.user._id === article.owner) next();

    res.status(400).send();
  } catch (err) {}

  req.user;
};
