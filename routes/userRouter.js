const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password.length < 6)
      throw new Error("비밀번호를 6자 이상으로 해주세요");
    if (req.body.username.length < 3)
      throw new Error("username 3자 이상으로 해주세요");

    const hashedPassWord = await hash(req.body.password, 10);
    // json 형태 아님
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassWord,
    }).save();
    res.json({ message: "user Registered" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await compare(req.body.password, user.hashedPassWord);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다");
    res.json({ message: "user validated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
