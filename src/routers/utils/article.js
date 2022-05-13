const router = require("express").Router();



router.get('/articles/info', (req, res) => {
const dot = {

    count: article_count

}
res.send(dot)

})

module.exports = router