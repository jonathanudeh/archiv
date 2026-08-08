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

const CLEANED_PATH = path.join(
  __dirname,
  "../../data/processed/departments-cleaned.json",
);

// CLEAN DUPLICATES FROM JSON

function cleanDepartments(departments) {
  const seen = new Map();

  const cleaned = [];
  const duplicates = [];

  for (const dept of departments) {
    // this is what determines whether two departments are duplicates.

    const key = `${dept.school}:${dept.slug}`;

    if (seen.has(key)) {
      duplicates.push({
        name: dept.name,
        slug: dept.slug,
        school: dept.school,
        duplicateOf: seen.get(key),
      });

      continue;
    }

    seen.set(key, {
      name: dept.name,
      slug: dept.slug,
    });

    cleaned.push(dept);
  }

  return {
    cleaned,
    duplicates,
  };
}

async function main() {
  try {
    await connectDB();

    console.log("Department Seeder");

    // READ JSON

    console.log("Reading departments JSON...");

    const rawData = await fs.readFile(PROCESSED_PATH, "utf8");

    const departments = JSON.parse(rawData);

    console.log(`Loaded ${departments.length} departments from JSON.\n`);

    // CLEAN DUPLICATES
    console.log("Checking JSON for duplicate departments...");

    const { cleaned, duplicates } = cleanDepartments(departments);

    console.log(`Original records : ${departments.length}`);
    console.log(`Unique records   : ${cleaned.length}`);
    console.log(`Duplicates found : ${duplicates.length}\n`);

    // SAVE CLEANED JSON

    if (duplicates.length > 0) {
      console.log("Saving cleaned departments JSON...");

      await fs.writeFile(
        CLEANED_PATH,
        JSON.stringify(cleaned, null, 2),
        "utf8",
      );

      console.log(`Cleaned file saved to:\n${CLEANED_PATH}\n`);
      console.log("Duplicate records removed:");

      for (const duplicate of duplicates) {
        console.log(`  - ${duplicate.name} (${duplicate.slug})`);
        console.log(`    School: ${duplicate.school}`);
      }

      console.log("");
    } else {
      console.log("No duplicate records found in JSON.\n");
    }

    console.log("Starting database seed...");
    console.log("Existing departments will be skipped.\n");

    let createdCount = 0;
    let skippedCount = 0;
    let duplicateErrorCount = 0;
    let failedCount = 0;

    // SEED DEPARTMENTS
    for (let i = 0; i < cleaned.length; i++) {
      const dept = cleaned[i];

      console.log(`[${i + 1}/${cleaned.length}] ${dept.name}`);

      // CHECK IF DEPARTMENT ALREADY EXISTS

      const existingDepartment = await Department.findOne({
        school: dept.school,
        slug: dept.slug,
      });

      if (existingDepartment) {
        skippedCount++;

        console.log("  - Already exists. Skipping.");

        continue;
      }

      // CREATE DEPARTMENT

      let department;

      try {
        const created = await Department.create([dept]);

        department = created[0];

        console.log("  - Department created.");
      } catch (err) {
        // HANDLE DUPLICATE KEY

        if (err.code === 11000) {
          duplicateErrorCount++;

          console.log("  ↳ Duplicate key detected. Skipping.");

          continue;
        }

        // OTHER DATABASE ERROR

        failedCount++;

        console.error("  ↳ Failed to create department.");

        console.error(err);

        // Do not stop the entire seed. Continue with the next department.

        continue;
      }

      // CREATE LEVELS

      try {
        const levels = [];

        for (let j = 1; j <= department.numberOfLevels; j++) {
          levels.push({
            name: `${j * 100}`,
            department: department._id,
          });
        }

        const createdLevels = await Level.insertMany(levels);

        // CREATE SEMESTERS

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

        // UPDATE SCHOOL STATS

        await School.findByIdAndUpdate(department.school, {
          $inc: {
            "stats.departmentsCount": 1,
            "stats.popularityScore": 2,
          },
        });

        createdCount++;

        console.log("  - Levels created.");
        console.log("  - Semesters created.");
        console.log("  - School stats updated.");
      } catch (err) {
        failedCount++;

        console.error("  - Department created, but levels/semesters failed.");

        console.error(err);

        continue;
      }
    }

    // FINAL DATABASE COUNTS

    const departmentCount = await Department.countDocuments();

    const levelCount = await Level.countDocuments();

    const semesterCount = await Semester.countDocuments();

    // FINAL REPORT

    console.log("\n");
    console.log("Department Seed Complete");
    console.log(`JSON records       : ${departments.length}`);
    console.log(`Unique JSON records: ${cleaned.length}`);
    console.log(`JSON duplicates     : ${duplicates.length}`);
    console.log(`Created             : ${createdCount}`);
    console.log(`Skipped             : ${skippedCount}`);
    console.log(`Duplicate errors    : ${duplicateErrorCount}`);
    console.log(`Failed              : ${failedCount}`);
    console.log(`Database departments: ${departmentCount}`);
    console.log(`Database levels     : ${levelCount}`);
    console.log(`Database semesters  : ${semesterCount}`);
  } catch (err) {
    console.error("SEED FAILED");

    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  }
}

main();
