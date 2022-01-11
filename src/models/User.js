const mongoose = require("mongoose");
const ISBN = require("isbn-validate");
const jwt = require("jsonwebtoken");
const csl = require("../utils/sandcasle/usercasl.js");

const userSchema = new mongoose.Schema(
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
      validate: (value) => {
        const pattern = /class[0-9]+[a-zA-Z]/i;
        if (!pattern.test(value)) throw new Error("Not a valid grade");
      },
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    private: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
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
    // expiresIn: 60 * 60,
  });
  if (!user.tokens) user.tokens = [];
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.methods.generateAbblilities = function () {
  const abb = csl.defineAbilityFor(this);

  return abb;
};

userSchema.methods.toJSON = function () {
  const that = this.toObject();

  delete that.tokens;
  delete that.abb;
  delete that.sit;
  return that;
};

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
