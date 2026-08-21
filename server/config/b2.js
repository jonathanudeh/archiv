const { S3Client } = require("@aws-sdk/client-s3");

// This s3 client knows how to communicate with our backblaze b2 bucket but doesnt have the ability to upload anything
const b2 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID,
    secretAccessKey: process.env.B2_APPLICATION_KEY,
  },
});

module.exports = b2;
