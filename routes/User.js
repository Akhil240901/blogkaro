import express from "express";
import User from "../model/User.js";
import e from "express";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/signup", async (req, res) => {
  //const {fullname,email,password}=req.body
  console.log(req.body);
  const newUser = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  });
  await newUser.save();
  return res.render("Home");
});
router.get("/signup", (req, res) => {
  return res.render("SignUp");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    res.send("Invalid email,try again with valid one");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  try {
    if (isMatch) {
      res.render("Home");
    }
  } catch (error) {
    res.status(500).send();
  }
});
router.get("/signin", (req, res) => {
  return res.render("SignIn");
});

export default router;
