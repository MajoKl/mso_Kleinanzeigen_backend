const router = require("express").Router();
const auth = require("../../../middelware/auth");

const Article = require("../../../models/Article");

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
    
    res.send(req.user.favorites);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/me/favorites", async (req, res) => {
  // console.log(req.body);
  // req.body = req.body || [];

  const ids_usr =  req.query.favorites?.split(",") || []

  const articles = await Article.find({  $and: [{_id:{ $in: ids_usr} }, { _id:{$nin: req.user.favorites}}]}  );

  if (articles.length != ids_usr.length)
    return res.status(400).send({ error: "Not all articles were found/ were added before" });

  const ids = articles.map((article) => article._id);

 

try{
 
  req.user.favorites = [...req.user.favorites, ...ids];
  await req.user.save();
  
  res.send(req.user.favorites);
}catch (e) {

  res.status(500).send(e.message)

}
 
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
