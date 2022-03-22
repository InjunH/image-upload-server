require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { imageRouter } = require('./routes/imageRouter');

const app = express();

const {MONGO_URI, PORT} = process.env;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connect!")
        // public 으로 접근 가능 함
        // app.use(express.static("uploads"));

        app.use('/uploads', express.static("uploads"));
        app.use("/images", imageRouter);
        app.listen(PORT, () => console.log("Express server listening on PORT" + PORT));
    })
    .catch((err) => console.log(err));

