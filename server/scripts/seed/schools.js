const mongoose = require("mongoose");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();
const connectDB = require("../../config/database");

const School = require("../../models/schoolModel");

const DATA_PATH = path.join(__dirname, "../../data/processed/schools.json");

async function seedSchools() {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    const raw = await fs.readFile(DATA_PATH, "utf-8");

    const schools = JSON.parse(raw);

    await School.deleteMany();

    console.log("Cleared existing schools");

    const inserted = await School.insertMany(schools);

    console.log(`Inserted ${inserted.length} schools`);

    console.log("Done");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

seedSchools();
