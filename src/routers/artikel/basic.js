const router = new require("express").Router();

const me = require("./userArtikel/me");
const pictures = require("./pictures");

router.use(me);
router.use(pictures);

module.exports = router;
