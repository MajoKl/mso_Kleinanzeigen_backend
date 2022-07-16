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
     if (!owner) return res.send([])
      
      
     owner = owner?._id
    }
  if(owner) matcher["owner"] = owner

  if(req.query.search) matcher["$text"] = {$search: req.query.search , $caseSensitive: false}
  if(req.query.article_id) matcher["_id"] = req.query.article_id
  matcher.$or = [{owner : req.user._id},{ private : false}]
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
