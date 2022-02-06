const mongoose = require("mongoose");
const ISBN = require("isbn-validate");
const dt = require("./subshemas/Details");

const articleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      description: "Stores the name of the article wich can be changed",
    },

    detailtName: {
      type: String,
      default: "",
    },

    realName: {
      type: String,
      required: true,
      description: "Stores the real name of the article wich will be static",
      immutable: true,
      unique: true,
    },

    article_type: {
      type: String,
      enum: ["Ich biete", "Ich Suche", "Ich tausche"],
    },

    categories: {
      type: Array,
      default: [],
      description: "Stores the _id of the categories of the article",
    },
    details: {
      type: dt,
    },
    basis_fornegotioations: {
      type: String,
      enum: ["Festpreis", "Verhandlungsbasis", "Zu Verschenken"],
      description: "Stores the diffent fornegotioations of the articles",
    },

    price: {
      type: Number,
      required: true,
      nullable: true,
    },

    discription: {
      type: String,
      default: "",
    },

    private: {
      type: Boolean,
      discription: "Schows if the article is private or not",
    },

    pictures: {
      type: [{ path: String, name: String }],
      default: [],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const articleModel = new mongoose.model("Article", articleSchema);

module.exports = articleModel;
