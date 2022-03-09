const router = require("express").Router();
const auth = require("../../../middelware/auth");

const User = require("../../../models/User");
const Article = require("../../../models/Article");
const { Mongoose } = require("mongoose");

router.get("/me/favorites", async (req, res) => {
  const { limit, skip } = req.query;
  const categories = req.query.categories?.split(",");
  const matcher = {};

  if (categories?.length > 0) matcher["categories"] = { $all: [...categories] };

  try {
    await req.user.populate({
      path: "favorites",
      options: {
        limit,
        skip,
      },
      match: matcher,
    });
    console.log(req.user.favorites);
    res.send(req.user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.post("/me/favorites", async (req, res) => {
  console.log(req.body);
  req.body = req.body || [];

  const articles = await Article.find({ _id: { $in: req.body } });

  if (articles.length != req.body.length)
    return res.status(400).send({ error: "Not all articles were found" });

  const ids = articles.map((article) => article._id);

  req.user.favorites = [...req.user.favorites, ...ids];
  await req.user.save();

  res.send(req.user.favorites);

  req.body;
});

router.delete("/me/favorites", auth, async (req, res) => {
  favorites_to_delete = req.query.favorites?.split(";");
  try {
    req.user.favorites = req.user.favorites.filter(
      (favor) => !favorites_to_delete.includes(favor.toString())
    );

    await req.user.save();
    res.send(req.user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
