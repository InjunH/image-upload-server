const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

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
      sessions: [{ createdAt: new Date() }],
    }).save();

    const session = user.sessions[0];

    res.json({
      message: "user Registered",
      sessionId: session._id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("가입되지 않은 이메일 입니다");
    const isValid = await compare(req.body.password, user.hashedPassWord);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다");

    user.sessions.push({ createdAt: new Date() });

    const session = user.sessions[user.sessions.length - 1];

    await user.save();

    res.json({
      message: "user validated",
      sessionId: session._id,
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    // console.log(req.user);
    if (!req.user) throw Error("invalid sessionid");
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { sessions: { _id: req.headers.sessionid } } }
    );
    res.json({ message: "user is Loggout" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/me", (req, res) => {
  try {
    // console.log(req.user);
    if (!req.user) throw new Error("권한이 없습니다");
    res.json({
      message: "user validated",
      sessionId: req.headers.sessionid,
      name: req.user.name,
      userId: req.user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/me2", (req, res) => {
  // 본인의 사진들만 return
  // public == false
});
module.exports = { userRouter };
