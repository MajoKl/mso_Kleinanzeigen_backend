const router = require("express").Router();
const auth = require("../../../middelware/auth");

const User = require("../../../models/User");
const Articles = require("../../../models/Article");

router.get("/users/articles", async (req, res) => {
  const categories = req.query.categories?.split(",") || [];
  const matcher = {};
  if (categories.length > 0) matcher["categories"] = { $all: [...categories] };
  
  var owner = undefined
  if (req.query.name) {
    
     owner = await User.findOne({name:req.query.name}).select("_id")
      owner = owner._id
    }
  if(owner) matcher[owner] = owner

  

    try {
      const articles = await Articles.find(
      matcher,null,
       {
        skip: req.query.skip,
        limit: req.query.limit,


      }
    ).populate({
      path: "owner"
    }).exec()

    
    res.send(articles);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
