import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const historySchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
  },
  currPrice: {
    type: Number,
    required: true
  }
});

const favGamesSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
  },
  currPrice: {
    type: Number,
    required: true
  }
});

const userSchema = new mongoose.Schema({

    firstname: {
      type: String,
      required: true,
      minlength: [3, "Minimum 3 characters are required"]
    },
    lastname: {
      type: String,
      minlength: [3, "Minimum 3 characters are required"]
    },

  email: {
    type: String,
    required: true,
    // minlength: [13, "Enter a valid mail id"]
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum 6 characters required"],
    select: false
  },

  otp: { type: Number },             // ✅ Add this
  otpExpiry: { type: Date },  

  history: {
    type: [historySchema]
  },

  favGames: {
    type: [favGamesSchema]
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

userSchema.methods.comparePassword = async function (UserEnteredPassword) {
  return bcrypt.compare(UserEnteredPassword, this.password);
};


userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

export default User;
