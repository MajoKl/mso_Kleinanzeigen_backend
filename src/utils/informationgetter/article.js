const Article = require("../../models/Article")



module.exports.article_count_routine = () => {
    
    
    Article.countDocuments({},(err,data) =>  {
        
        if(err) console.log("penis:" + err)
        console.log(data)
        global.article_count = data})

    
    setInterval(async() => {
        
        Article.countDocuments({},(err,data) =>  {
        
            if(err) console.log("penis:" + err)
            global.article_count = data})

    }, 60000);


} 


