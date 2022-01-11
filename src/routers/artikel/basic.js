const router = new require("express").Router();

const me = require("./userArtikel/me");

router.use(me);

module.exports = router;
