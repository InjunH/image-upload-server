const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const multerS3 = require("multer-s3");
const { s3 } = require("../aws");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "./uploads"),
//   filename: (req, file, cb) =>
//     cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
// });

const storage = multerS3({
  s3,
  bucket: "image-upload-ijhwang",
  key: (req, file, cb) => {
    cb(null, `raw/${uuid()}.${mime.extension(file.mimetype)}`);
  },
});
// multer.diskStorage를 이용하면 파일 저장과정을 제어할 수 있음
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = { upload };
