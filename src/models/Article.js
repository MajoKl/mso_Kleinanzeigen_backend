const { Schema, Model, Mongoose } = require("mongoose");
const ISBN = require("isbn-validate");

const articleSchema = new Schema(
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
    },

    ISBN: { type: String, required: false },
    discription: {
      type: "String",
      discription: "Stores the isbn of the article",
    },
    validator: (val) => {
      val = String(val);
      val.re;
      if (!ISBN.Validate(val.strip()))
        throw new Error("This is not a valid isbn");
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
      default: 0,
    },
    private: {
      type: Boolean,
      discription: "Schows if the article is private or not",
    },
    owner: {
      type: Mongoose.Schema.Type.ObjectID,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const articleModel = new Model("Article", articleSchema);

module.exports = articleModel;
