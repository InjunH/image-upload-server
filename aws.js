const aws = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;
const s3 = new aws.S3({
  secretAccessKey: AWS_ACCESS_KEY,
  accessKeyId: AWS_SECRET_KEY,
});

module.exports = { s3 };
