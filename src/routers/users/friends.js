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
  
  const kek = req.query["favorits"].split(",") || [];

  const articles = await Article.find({ _id: { $in: kek } });

  if (articles.length != kek.length)
    return res.status(400).send({ error: "Not all articles were found" });

  const ids = articles.map((article) => article._id);

  req.user.favorites = [...req.user.favorites, ...ids];
  await req.user.save();

  res.send(req.user.favorites);

  kek;
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

router.get("/me/friends", auth, async (req, res) => {
try {
  const user = await User.findById(req.user._id).populate("friends");
  const friends = user.friends;

  res.send(friends);
  
} catch (error) {
  res.status(500).send(error.message);
}

});


router.post("/me/friend_request", auth, async (req, res) => {

  const friend_id = req.query.friend_id;

  if (!friend_id) return res.status(400).send({ error: "No friend id provided" });

  try {

    const friend = await User.findById(friend_id);

    if (!friend) return res.status(400).send({ error: "No user with such id" });

    if (friend.friends.includes(req.user._id))
      return res.status(400).send({ error: "You are already friends" });

    if (friend.friend_requests.includes(req.user._id))
      return res.status(400).send({ error: "You have already sent a friend request" });

    if (req.user.friend_requests.includes(friend_id))
    {  req.user.friends =  [...req.user.friends, friend_id] 
      friend.friends = [...friend.friends, req.user._id]
      res.send("Friend added to your friends list");
    }
    
    friend.friend_requests = [...friend.friend_requests, req.user._id];
    
    await req.user.save(); 
    await friend.save();
    
  
    res.send("Friend request sent");
  
    
  }


    catch (error) {

    res.status(500).send(error.message);

  }



})




module.exports = router;
