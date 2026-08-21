const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const b2 = require("../config/b2");

const uploadToB2 = async (buffer, key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  return await b2.send(command);
};

const deleteFromB2 = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: key,
  });

  return await b2.send(command);
};

const getB2SignedUrl = async (key, expiresIn = 900, disposition = "inline") => {
  const command = new GetObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: disposition,
  });

  return await getSignedUrl(b2, command, {
    expiresIn,
  });
};

module.exports = {
  uploadToB2,
  deleteFromB2,
  getB2SignedUrl,
};
