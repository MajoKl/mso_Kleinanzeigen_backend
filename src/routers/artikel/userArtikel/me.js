const router = require("express").Router();
const auth = require("../../../middelware/auth");

const User = require("../../../models/User");
const Article = require("../../../models/Article");

const { errormessages } = require("../../../utils/messages/errors");
const { response } = require("../../../app");
router.use(auth);

router.get("/me/articles", async (req, res) => {
  if (req.user.abb.cannot("read", "Article"))
    res.status(401).send({ error: errormessages.permissonerror });

  const { limit, skip } = req.query;

  try {
    await req.user.populate({
      path: "Articles",
      options: {
        limit,
        skip,
      },
    });

    return res.status(200).send(req.user.Articles);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.post("/me/articles", async (req, res) => {
  const data = req.body;
  let article;

  try {
    article = new Article({
      Name: data.Name,
      realName: data.Name,
      ISBN: data.ISBN,
      categories: data.Categories,
      basis_fornegotioations: data.BasisForNegotioations,
      price: data.Price,
      private: data.Private,
      owner: req.user._id,
    });
  } catch (error) {
    res.status(400).send();
  }

  try {
    await article.save();
    return res.send(article);
  } catch (error) {
    res.sendStatus(500).send();
  }
});

<<<<<<< HEAD
router.put("/me/articles", async (req, res) => {
  invalid_update_keys = ["realName", "owner"];

  const data = req.body;

  const invkey = req.body.filter((dat) => invalid_update_keys.includes(dat));
  if (invkey.length > 0)
    return res.status(400).send({ error: `Following key cant be updated` });

  try {
    const article = await Article.findOne({
      _id: req.body._id,
      owner: req.user._id,
    });

    Object.keys(req.body).forEach((key) => {
      article[key] = req.body[key];
    });

    await article.save();

    res.send(article);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/users/:name", async (req, res) => {
=======
router.get("/users", async (req, res) => {
>>>>>>> 26e6c9f47619cbf57a915a1cbbcef96b1b527dc7
  if (req.user.abb.cannot("read", "User", "name"))
    return res.status(401).send();

  try {
    const user = await User.findOne({ Name: req.query.name });

    if (!user) return res.status(401).send({ errror: "User not found" });
    if (user.private)
      response.status(404).send({ errror: "The user is private" });
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/users/articles", async (req, res) => {
  const name = req.query.name || req.user.name;

  const matcher = {};

  if (req.user.name !== name) matcher.private = false;
  

  try {
    const user = await User.findOne({ name: name }).populate({
      path: "Articles",
      options: {
        skip: req.query.skip,
        limit: req.query.limit,
      },
      match: matcher,
    });

    if (!user) return res.status(400).send({ error: "user not found" });

    res.send(user.Articles);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
