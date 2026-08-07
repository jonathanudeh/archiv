require("dotenv").config();

const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("../../config/database");

const Department = require("../../models/departmentModel");
const Level = require("../../models/levelModel");
const Semester = require("../../models/semesterModel");
const School = require("../../models/schoolModel");

const PROCESSED_PATH = path.join(
  __dirname,
  "../../data/processed/departments.json",
);

async function main() {
  try {
    await connectDB();

    const departments = JSON.parse(await fs.readFile(PROCESSED_PATH, "utf8"));

    console.log("Cleaning existing data...");

    // Clean existing data
    await Semester.deleteMany({});
    await Level.deleteMany({});
    await Department.deleteMany({});

    // Reset school stats
    await School.updateMany(
      {},
      {
        $set: {
          "stats.departmentsCount": 0,
          "stats.popularityScore": 0,
        },
      },
    );

    console.log("Database cleaned.");
    console.log(`Seeding ${departments.length} departments...\n`);

    for (let i = 0; i < departments.length; i++) {
      const dept = departments[i];

      console.log(`[${i + 1}/${departments.length}] ${dept.name}`);

      // Create Department
      const [department] = await Department.insertMany([dept]);

      // Create Levels
      const levels = [];

      for (let j = 1; j <= department.numberOfLevels; j++) {
        levels.push({
          name: `${j * 100}`,
          department: department._id,
        });
      }

      const createdLevels = await Level.insertMany(levels);

      // Create Semesters
      const semesters = [];

      for (const level of createdLevels) {
        semesters.push(
          {
            name: "first",
            level: level._id,
          },
          {
            name: "second",
            level: level._id,
          },
        );
      }

      await Semester.insertMany(semesters);

      // Update School Stats
      await School.findByIdAndUpdate(department.school, {
        $inc: {
          "stats.departmentsCount": 1,
          "stats.popularityScore": 2,
        },
      });
    }

    const departmentCount = await Department.countDocuments();
    const levelCount = await Level.countDocuments();
    const semesterCount = await Semester.countDocuments();

    console.log("\n====================================");
    console.log("Department Seed Complete");
    console.log("====================================");
    console.log(`Departments : ${departmentCount}`);
    console.log(`Levels      : ${levelCount}`);
    console.log(`Semesters   : ${semesterCount}`);
    console.log("====================================");
  } catch (err) {
    console.error("\nSeed failed.");
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
