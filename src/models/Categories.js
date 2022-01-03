const { Schema, Model, Mongoose } = require("mongoose");

const categorieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {}
);

categorieSchema.virtual("articles", {
  ref: "Article",
  localfield: "_id",
  foreingField: "categories",
});
