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

module.exports = {
  saveResults,
  saveFailed,
  sleep,
};
