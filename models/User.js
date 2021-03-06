const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    hashedPassWord: { type: String, required: true },
    sessions: [
      {
        createdAt: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
