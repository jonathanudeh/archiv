const path = require("path");

const createB2Key = (materialId, filename, mimetype) => {
  const extension = path.extname(filename);

  const folder = mimetype.startsWith("image/")
    ? "materials/images"
    : "materials/pdf";

  return `${folder}/${materialId}${extension}`;
};

module.exports = createB2Key;
