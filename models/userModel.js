const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have a name"],
    },
    email: {
      type: String,
      required: [true, "user must have an email"],
      unique: [true],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "user must have a password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "user must have a confirmPassword"],
      validate: {
        validator: function (value) {
          return value == this.password;
        },
        message: "the two passwords are not matched",
      },
    },
    photo: { type: String, default: "/images/default.jpg" },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

// hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkCorrectPassword = async (candidate, password) => {
  return await bcrypt.compare(candidate, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
