const router = require("express").Router();
const auth = require("../../../middelware/auth");

const User = require("../../../models/User");
const Article = require("../../../models/Article");

const { errormessages } = require("../../../utils/messages/errors");
const { response } = require("../../../app");

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

    await article.save();
    return res.send(article);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

router.put("/me/articles", async (req, res) => {
  invalid_update_keys = ["realName", "owner", "pictures"];

  const { _id, data } = req.body;

  if (!_id)
    return res
      .status(400)
      .send({ error: "There must be a roome id provided." });

  const invkey = Object.keys(req.body).filter((dat) =>
    invalid_update_keys.includes(dat)
  );
  if (invkey.length > 0)
    return res
      .status(400)
      .send({ error: `Following key/s ${invkey}cant be updated` });

  delete req.body.pictures;

  try {
    const article = await Article.findOne({
      _id,
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

module.exports = router;
