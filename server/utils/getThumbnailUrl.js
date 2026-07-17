// utils/getThumbnailUrl.js

const cloudinary = require("../config/cloudinary");

const getResourceType = (mimeType) => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  return "raw";
};

exports.getThumbnailUrl = (publicId, mimeType) => {
  if (mimeType.startsWith("image/")) {
    return cloudinary.url(publicId, {
      secure: true,
      resource_type: "image",
      width: 280,
      crop: "fill",
    });
  }

  return cloudinary.url(publicId, {
    secure: true,
    resource_type: getResourceType(mimeType),

    page: 1,
    format: "jpg",

    width: 280,
    crop: "fill",
  });
};
