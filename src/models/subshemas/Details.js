const { Schema } = require("mongoose");

const deatilschema = new Schema(
  {
    count: {
      type: "integer",
      nullable: false,
      required: true,
    },
  },
  {}
);
