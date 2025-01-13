import mongoose from "mongoose";
import { type } from "os";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileurl: {
    type: String,
    default: "./images/avatar.jpg",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

//before saving to database, convert password to hashpassword
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
