const { Schema, Model, Mongoose } = require("mongoose");

const categorieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    articles: {
      type: Mongoose.Schema.Type.ObjectID,
    },
  },
  {}
);
