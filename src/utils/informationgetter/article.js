const Article = require("../../models/Article");

module.exports.article_count_routine = () => {
  console.log("Article count routine started");
  Article.countDocuments({}, (err, data) => {
    if (err) return console.log("Something bad happend:" + err);
    global.article_count = data;
  });

  return setInterval(async () => {
    Article.countDocuments({}, (err, data) => {
      if (err) return console.log("Something bad happend:" + err);
      global.article_count = data;
    });
  }, 60000);
};
