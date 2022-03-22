require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");
const app = express();
const { MONGO_URI, PORT } = process.env;
const { authenicate } = require("./middleware/authenication");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connect!");
    // public 으로 접근 가능 함
    // app.use(express.static("uploads"));

    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use(authenicate);
    app.use("/images", imageRouter);
    app.use("/users", userRouter);
    app.listen(PORT, () =>
      console.log("Express server listening on PORT" + PORT)
    );
  })
  .catch((err) => console.log(err));
