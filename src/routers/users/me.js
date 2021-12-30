const { Router } = require("express");

const { requiresAuth } = require("express-openid-connect");

const router = new Router();

router.get("/create", requiresAuth(), async (req, res) => {
  res.send("a");
});

router.get("/", (req, res) => {});

module.exports = router;
