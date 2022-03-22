const { Router } = require("express");
const imageRouter = Router();
const Image = require('../models/Image');
const { upload } = require("../middleware/imageUpload");

/*
upload.single("imageTest") 라는 미들웨어 추가해줌으로서
이미지 받을 수 있다
*/
imageRouter.post("/images",upload.single("images") , async (req, res) => {
    const image = await new Image({key: req.file.filename, originalFileName: req.file.originalname}).save()
    res.json(image);
});

imageRouter.get("/images", async (req , res) => {
    const images = await Image.find();
    res.json(images); 
})

module.exports = { imageRouter };