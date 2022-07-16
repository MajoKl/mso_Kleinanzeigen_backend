const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Article = require("../../src/models/Article");
const fs = require("fs");
const path = require("path");

//User fixtuers

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "UserOne",
  password: "Fuck this ",
  sit: 121461,
  grade: "class2002d",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "UserTwo",
  password: "Fuck this ",
  sit: 12146,
  grade: "class2002d",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const articleOne = {
  Name: "ArticleOne",
  realName: "ArticleOne",
  categories: ["Bücher", "Sience", "Hermann", "KaNdrdIAsruNzoh"],
  basis_fornegotioations: "Festpreis",
  article_type: "Ich Suche",
  price: 4455,
  private: true,
  owner: userOneId,
};

const articleTwo = {
  Name: "ArticleTwo",
  realName: "ArticleTwo",
  categories: ["Bücher1", "Sience1", "Hermann1", "KaNdrdIAsruNzoh1"],
  basis_fornegotioations: "Festpreis",
  article_type: "Ich Suche",
  price: 4455,
  private: false,
  owner: userOneId,
};
const setUpDatabase = async () => {
  //User setUpDatabasew
  await User.deleteMany();
  await Article.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  //Artikel setUpDatabase

  await new Article(articleOne).save();
  await new Article(articleTwo).save();
};

module.exports = {
  userOneId,
  userOne,

  userTwo,
  userTwoId,

  articleOne,
  articleTwo,

  setUpDatabase,
};
