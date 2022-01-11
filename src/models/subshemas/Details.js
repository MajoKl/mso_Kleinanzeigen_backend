const { Schema } = require("mongoose");

const deatilschema = new Schema(
  {
    count: {
      type: Number,
      nullable: false,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = deatilschema;
