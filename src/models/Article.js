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
      immutable: true,
    },

    categories: {
      type: Array,
      default: [],
      description: "Stores the _id of the categories of the article",
    },
    count: {
      type: Number,
      nullable: false,
      default: 1,
    },
    ISBN: {
      type: String,
      required: false,
      discription: {
        type: "String",
        discription: "Stores the isbn of the article",
      },
      validator: (val) => {
        val = String(val);
        val.re;
        if (!ISBN.Validate(val.strip()))
          throw new Error("This is not a valid ISBN");
      },
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
      type: [{ name: String }],
      default: [],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

const articleModel = new mongoose.model("Article", articleSchema);

module.exports = articleModel;
