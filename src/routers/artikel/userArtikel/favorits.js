const router = require("express").Router();
const auth = require("../../../middelware/auth");

const User = require("../../../models/User");
const Article = require("../../../models/Article");

router.get("me/articles/favorits", async (req, res) => {
  const { limit, skip } = req.query;
  const categories = req.query.categories.split(",");
  const matcher = {};

  if (categories.length > 0) matcher["categories"] = { $all: [...categories] };

  try {
    req.user.populate({
      path: "Favorites",
      options: {
        limit,
        skip,
      },
      match: matcher,
    });
    res.send(req.user.favorites);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/me/articles/favorites", async (req, res) => {});
