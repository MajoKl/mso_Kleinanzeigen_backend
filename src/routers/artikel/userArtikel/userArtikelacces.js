const router = require("express").Router();
const auth = require("../../../middelware/auth");

const User = require("../../../models/User");
const Article = require("../../../models/Article");

router.get("/users/articles", async (req, res) => {
  const name = req.query.name || req.user.name;
  const categories = req.query.categories?.split(",") || [];
  const matcher = {};

  if (categories.length > 0) matcher["categories"] = { $all: [...categories] };

  try {
    const user = await Article.find({
      categories: matcher.categories,
      options: {
        skip: req.query.skip,
        limit: req.query.limit,
      },
    }).populate({
      path: "owner",
      name,
    });

    if (!user) return res.status(400).send({ error: "user not found" });

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
