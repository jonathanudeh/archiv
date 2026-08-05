const fs = require("fs/promises");
const path = require("path");

const OUTPUT_PATH = path.join(__dirname, "../../../data/raw/departments.json");

const FAILED_PATH = path.join(__dirname, "../../../data/raw/failed.json");

async function saveResults(data) {
  await fs.mkdir(path.dirname(OUTPUT_PATH), {
    recursive: true,
  });

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2));
}

async function saveFailed(data) {
  await fs.mkdir(path.dirname(FAILED_PATH), {
    recursive: true,
  });

  await fs.writeFile(FAILED_PATH, JSON.stringify(data, null, 2));
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const DEFAULT_LEVELS = 4;

const FIVE_YEAR = [
  "ARCHITECTURE",
  "BUILDING",
  "QUANTITY SURVEYING",
  "ESTATE MANAGEMENT",
  "SURVEYING AND GEOINFORMATICS",
  "URBAN AND REGIONAL PLANNING",
  "LAW",
  "CIVIL LAW",
  "ISLAMIC/SHARIA LAW",
  "NURSING",
  "NURSING SCIENCE",
  "PHARMACY",
  "DENTAL SURGERY",
  "VETERINARY MEDICINE",
  "MEDICAL LABORATORY SCIENCE",
  "RADIOGRAPHY",
  "OPTOMETRY",
  "PHYSIOTHERAPY",
];

const SIX_YEAR = ["MEDICINE", "MEDICINE AND SURGERY"];

function getNumberOfLevels(name) {
  const department = name.toUpperCase();

  if (SIX_YEAR.some((x) => department.includes(x))) return 6;

  if (FIVE_YEAR.some((x) => department.includes(x))) return 5;

  return DEFAULT_LEVELS;
}

module.exports = {
  saveResults,
  saveFailed,
  sleep,
  getNumberOfLevels,
};
