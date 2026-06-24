const School = require("../models/schoolModel");
const Department = require("../models/departmentModel");
const Material = require("../models/materialModel");
const catchAsync = require("../utils/catchAsync");

function getScore(text, search) {
  const value = text?.toLowerCase() || "";
  const query = search.toLowerCase();

  if (value === query) return 100;
  if (value.startsWith(query)) return 80;
  if (value.includes(query)) return 60;

  return 0;
}

exports.globalSearch = catchAsync(async (req, res, next) => {
  const search = req.query.q?.trim();

  if (!search) {
    return res.status(200).json({
      status: "success",
      results: 0,
      total: 0,
      page: 1,
      totalPages: 0,
      data: {
        results: [],
      },
    });
  }

  const regex = new RegExp(search, "i");

  const [schools, departments, materials] = await Promise.all([
    School.find({
      $or: [
        { name: regex },
        { acronym: regex },
        { aliases: regex },
        { description: regex },
      ],
    }).select("name slug acronym stats"),

    Department.find({
      $or: [{ name: regex }],
    })
      .populate("school", "name slug")
      .select("name slug school stats"),

    Material.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { tags: regex },
      ],
    }).select("title slug category viewCount downloadCount"),
  ]);

  const results = [
    ...schools.map((school) => ({
      id: school._id,
      type: "school",
      title: school.name,
      subtitle: school.acronym,
      slug: school.slug,

      relevance:
        getScore(school.name, search) + (school.stats?.popularityScore || 0),
    })),

    ...departments.map((department) => ({
      id: department._id,
      type: "department",
      title: department.name,
      subtitle: department.school?.name,
      slug: department.slug,
      schoolSlug: department.school?.slug,

      relevance:
        getScore(department.name, search) +
        (department.stats?.popularityScore || 0) +
        15,
    })),

    ...materials.map((material) => ({
      id: material._id,
      type: "material",
      title: material.title,
      subtitle: material.category,
      slug: material.slug,

      relevance:
        getScore(material.title, search) +
        material.viewCount +
        material.downloadCount +
        30,
    })),
  ];

  results.sort((a, b) => b.relevance - a.relevance);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedResults = results.slice(start, end);

  res.status(200).json({
    status: "success",
    results: paginatedResults.length,
    total: results.length,
    page,
    totalPages: Math.ceil(results.length / limit),
    data: {
      results: paginatedResults,
    },
  });
});
