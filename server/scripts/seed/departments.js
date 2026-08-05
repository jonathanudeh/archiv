require("dotenv").config();

const fs = require("fs/promises");
const path = require("path");

const mongoose = require("mongoose");

const connectDB = require("../config/database");

const Department = require("../models/departmentModel");

const School = require("../models/schoolModel");

const FILE = path.join(__dirname, "../data/processed/departments.json");

async function main() {
  await connectDB();

  const departments = JSON.parse(await fs.readFile(FILE, "utf8"));

  await Department.deleteMany();

  await Department.insertMany(departments);

  console.log(`Inserted ${departments.length} departments`);

  // Update department counts
  const schools = await School.find();

  for (const school of schools) {
    const count = await Department.countDocuments({
      school: school._id,
    });

    school.stats.departmentsCount = count;

    await school.save();
  }

  console.log("School stats updated");

  await mongoose.disconnect();
}

main();
