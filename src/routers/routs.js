const router =  require("express").Router();

const user = require("./users/user");
const me = require("./users/me");
const basic = require("./artikel/basic");
const auth = require("../middelware/auth");

router.use(auth, user);
router.use(auth, me);
router.use(basic);

module.exports = router;
