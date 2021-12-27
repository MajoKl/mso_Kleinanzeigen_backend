const { Schema } = require("mongoose");
const ISBN = require("isbn-validate");

const article = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    realName: {
      type: String,
      required: true,
    },

    ISBN: { type: String, required: false },
    discription: {
      type: "String",
    },
    validator: (val) => {
      val = String(val);
      val.re;
      ISBN.Validate(val.strip());
    },
    categories: {},
    basis_fornegotioations: {},
    price: {},
  },
  {}
);
