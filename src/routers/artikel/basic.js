const router = new require("express").Router();

const me = require("./userArtikel/me");
const pictures = require("./pictures");

const auth = require("../../middelware/auth");

router.use(auth, me);
router.use(pictures);

module.exports = router;
