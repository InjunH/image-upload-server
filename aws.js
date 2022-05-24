const aws = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;
const s3 = new aws.S3({
  secretAccessKey: AWS_ACCESS_KEY,
  accessKeyId: AWS_SECRET_KEY,
});

/* 
1. 이미지 최적화 upgrade
getSignedUrl 생성
  - presignedUrl 생성을 aws에 요청함
    - Expires : 1회성으로 요청하는 presignedUrl의 만료 시간 (초)
*/
const getSignedUrl = ({ key }) => {
  return new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Bucket: "image-upload-tutorial",
        Fields: { key },
        Expires: 300,
        Conditions: [
          ["content-length-range", 0, 50 * 1000 * 1000],
          ["start-with", "$Content-Type", "image/"],
        ],
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};
module.exports = { s3, getSignedUrl };
