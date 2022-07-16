const articel_timeout = require("./article").article_count_routine();

process.on("beforeExit", () => {
  articel_timeout.unref();
});
