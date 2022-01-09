const mongoose = require("mongoose");
const ISBN = require("isbn-validate");

const articleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      description: "Stores the name of the article wich can be changed",
    },

    realName: {
      type: String,
      required: true,
      description: "Stores the real name of the article wich will be static",
      immutable: true,
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
    categories: {
      type: Array,
      default: [],
      description: "Stores the _id of the categories of the article",
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
    private: {
      type: Boolean,
      discription: "Schows if the article is private or not",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const articleModel = new mongoose.model("Article", articleSchema);

module.exports = articleModel;
