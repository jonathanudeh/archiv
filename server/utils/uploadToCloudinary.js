const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

exports.uploadToCloudinary = (
  buffer,
  folder,
  resourceType,
  originalFilename,
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,

        use_filename: true,
        unique_filename: true,

        filename_override: originalFilename,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
