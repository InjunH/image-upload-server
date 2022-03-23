const { Router } = require("express");
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

/*
upload.single("imageTest") 라는 미들웨어 추가해줌으로서
이미지 받을 수 있다
*/
imageRouter.post("/", upload.single("images"), async (req, res) => {
  // 유저 정보 확인 , public 권한 확인

  //   console.log(req.file);

  const image = await new Image({
    key: req.file.filename,
    originalFileName: req.file.originalname,
  }).save();
  res.json(image);
});

imageRouter.get("/", async (req, res) => {
  // public 이미지만 제공
  const images = await Image.find();
  res.json(images);
});

// imagetRouter.delete("/:imageId", (req, res) => {
//   //권한 확인
//   // 사진 삭제
// });

// imageRouter.patch("/:imageId/like", (req, res) => {
//   // 유저 권한 확인
//   //like 중복안되도록
// });
// imageRouter.patch("/imageId/unlike", (req, res) => {
//   // 유저 권한 확인
//   //like 중복 취소 안되도록
// });

module.exports = { imageRouter };
