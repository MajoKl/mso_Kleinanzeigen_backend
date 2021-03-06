const router = require("express").Router();
const Article = require("../../../models/Article");

const { errormessages } = require("../../../utils/messages/errors");

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
  const data = req.body ||{};
  let article;
 
delete data.pictures
delete data._id
delete data.owner

  try {
    article = new Article({
      ...data, 
      owner: req.user._id,
    });
    
    await article.save();
    global.article_count++
    return res.send(article);

  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

router.put("/me/articles", async (req, res) => {
  invalid_update_keys = ["realName", "owner", "pictures"];

  const { _id, data } = req.body;

  if (!_id && _id === "")
    return res
      .status(400)
      .send({ error: "There must be a roome id provided." });

  const invkey = Object.keys(req.body).filter((dat) =>
    invalid_update_keys.includes(dat)
  );
  if (invkey.length > 0)
    return res
      .status(400)
      .send({ error: `Following key/s ${invkey} cant be updated` });

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

router.delete("/me/articles", async function (req, res) {
  const articles = req.query.article?.split(",");

  try {
    const a = await Article.deleteOne({
      _id: { $in: articles },
      owner: req.user._id,
    });

    if (!a)
      return res
        .status(400)
        .send({ error: "Article not found or you do not have permission" });

    res.status(200).send(a);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
