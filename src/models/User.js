const { Schema, model, mongoose } = require("mongoose");
const ISBN = require("isbn-validate");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sit: {
      type: Number,
    },
    grade: {
      type: String,
      required: true,
      validator: (value) => {
        pattern = /class[0-9]+[a-zA-Z]/i;
        if (!pattern.test(value)) throw new Error("Not a valid grade");
      },
      role: {
        type: String,
        required: true,
        default: "user",
      },
      tokens: [
        {
          token: {
            type: String,
            require: true,
          },
        },
      ],
      private: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

userSchema.virtual("Articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.methods.generateAbblilities = async function () {
  const abb = "";
};

const userModel = new model("User", userSchema);

module.exports = userModel;
