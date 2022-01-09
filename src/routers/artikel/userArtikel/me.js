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

  console.log("adfasdf");

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

module.exports = router;
