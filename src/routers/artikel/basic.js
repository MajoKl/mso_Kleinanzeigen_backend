const router = new require("express").Router();

const me = require("./userArtikel/me");
const pictures = require("./pictures");
const userArtikel = require("./userArtikel/userArtikelacces");
const userFavorites = require("./userArtikel/favorits");

const auth = require("../../middelware/auth");

router.use(auth, me);
router.use(pictures);
router.use(auth, userArtikel);
router.use(auth, userFavorites);

module.exports = router;
