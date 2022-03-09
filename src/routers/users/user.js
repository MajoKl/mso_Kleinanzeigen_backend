const router = new require("express").Router();

const User = require("../../models/User");

router.get("/user", async (req, res) => {
  if (req.user.abb.cannot("read", "User", "name"))
    return res.status(401).send();

  try {
    const user = await User.findOne({ name: req.query.name });

    if (!user) return res.status(401).send({ errror: "User not found" });
    if (user.private)
      return res.status(404).send({ errror: "The user is private" });
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
