const Material = require("../models/materialModel");
const School = require("../models/schoolModel");
const Department = require("../models/departmentModel");

exports.trackDownload = async (material) => {
  await Promise.all([
    Material.findByIdAndUpdate(material._id, {
      $inc: {
        downloadCount: 1,
      },
    }),

    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.downloadsCount": 1,
        "stats.popularityScore": 3,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.downloadsCount": 1,
        "stats.popularityScore": 3,
      },
    }),
  ]);
};

exports.trackView = async (material) => {
  await Promise.all([
    Material.findByIdAndUpdate(material._id, {
      $inc: {
        viewCount: 1,
      },
    }),

    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.viewsCount": 1,
        "stats.popularityScore": 1,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.viewsCount": 1,
        "stats.popularityScore": 1,
      },
    }),
  ]);
};

exports.trackSave = async (material) => {
  await Promise.all([
    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.savesCount": 1,
        "stats.popularityScore": 2,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.savesCount": 1,
        "stats.popularityScore": 2,
      },
    }),
  ]);
};

exports.trackUnsave = async (material) => {
  await Promise.all([
    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.savesCount": -1,
        "stats.popularityScore": -2,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.savesCount": -1,
        "stats.popularityScore": -2,
      },
    }),
  ]);
};

exports.trackUpload = async (material) => {
  await Promise.all([
    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.materialsCount": 1,
        "stats.popularityScore": 5,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.materialsCount": 1,
        "stats.popularityScore": 5,
      },
    }),
  ]);
};

exports.trackDelete = async (material) => {
  await Promise.all([
    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.materialsCount": -1,
        "stats.popularityScore": -5,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.materialsCount": -1,
        "stats.popularityScore": -5,
      },
    }),
  ]);
};

exports.runInBackground = (asyncFn) => {
  Promise.resolve()
    .then(asyncFn)
    .catch((err) => {
      console.error("Analytics error:", err);
    });
};
