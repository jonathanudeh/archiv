require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/database");

const School = require("../models/schoolModel");
const data = require("../data/raw/departments.json");

/*
|--------------------------------------------------------------------------
| Normalize
|--------------------------------------------------------------------------
*/

function normalize(value = "") {
  return value
    .toUpperCase()
    .replace(/&/g, "AND")
    .replace(/[()]/g, "")
    .replace(/[.,]/g, "")
    .replace(/[-–—]/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/*
|--------------------------------------------------------------------------
| Scraper aliases
|--------------------------------------------------------------------------
*/

const SCRAPER_ALIASES = {
  UAM: "JOSEPH SARWUAN TARKA UNIVERSITY",
  FUAM: "JOSEPH SARWUAN TARKA UNIVERSITY",

  OAU: "OBAFEMI AWOLOWO UNIVERSITY",
  NOUN: "NATIONAL OPEN UNIVERSITY OF NIGERIA",
  FUNAAB: "FEDERAL UNIVERSITY OF AGRICULTURE ABEOKUTA",

  COOU: "CHUKWUEMEKA ODUMEGWU OJUKWU UNIVERSITY",

  RSUST: "RIVERS STATE UNIVERSITY",

  KSUST: "KEBBI STATE UNIVERSITY OF SCIENCE AND TECHNOLOGY",

  AAU: "AMBROSE ALLI UNIVERSITY",

  ABSU: "ABIA STATE UNIVERSITY",

  TASU: "TARABA STATE UNIVERSITY",

  TASUED: "TAI SOLARIN UNIVERSITY OF EDUCATION",

  "TECH-U": "FIRST TECHNICAL UNIVERSITY",

  "COVENANT UNIVERSITY": "COVENANT UNIVERSITY OTA",

  LMU: "LANDMARK UNIVERSITY",

  CUAB: "CRESCENT UNIVERSITY",

  EU: "ELIZADE UNIVERSITY",

  FUO: "FOUNTAIN UNIVERSITY",

  AU: "ADELEKE UNIVERSITY",

  BUT: "BELLS UNIVERSITY OF TECHNOLOGY",

  PAU: "PAUL UNIVERSITY",

  MU: "MADONNA UNIVERSITY",

  AUI: "AUGUSTINE UNIVERSITY",

  AUO: "ACHIEVERS UNIVERSITY",

  AJU: "ARTHUR JARVIS UNIVERSITY",

  GUU: "GREGORY UNIVERSITY",

  TANU: "TANSIAN UNIVERSITY",

  SAU: "SAMUEL ADEGBOYEGA UNIVERSITY",

  JABU: "JOSEPH AYO BABALOLA UNIVERSITY",

  OUI: "ODUDUWA UNIVERSITY",

  UMM: "UNIVERSITY OF MKAR",

  UNICHRIS: "CHRISTOPHER UNIVERSITY",
};

/*
|--------------------------------------------------------------------------
| Build searchable values for one school
|--------------------------------------------------------------------------
*/

function getSearchValues(school) {
  const values = [];

  if (school.acronym) values.push(school.acronym);

  if (school.name) values.push(school.name);

  if (Array.isArray(school.aliases)) {
    values.push(...school.aliases);
  }

  return [...new Set(values.filter(Boolean).map(normalize))];
}

/*
|--------------------------------------------------------------------------
| Matching Algorithm
|--------------------------------------------------------------------------
*/

function findSchool(search, schools) {
  let key = normalize(search);

  if (SCRAPER_ALIASES[key]) {
    key = normalize(SCRAPER_ALIASES[key]);
  }

  //-------------------------------------------------------
  // 1. Exact acronym
  //-------------------------------------------------------

  for (const school of schools) {
    if (!school.acronym) continue;

    if (normalize(school.acronym) === key) {
      return school;
    }
  }

  //-------------------------------------------------------
  // 2. Exact alias/name
  //-------------------------------------------------------

  for (const school of schools) {
    const values = getSearchValues(school);

    if (values.includes(key)) {
      return school;
    }
  }

  //-------------------------------------------------------
  // 3. DB value contains search
  //-------------------------------------------------------

  for (const school of schools) {
    const values = getSearchValues(school);

    if (values.some((v) => v.includes(key))) {
      return school;
    }
  }

  //-------------------------------------------------------
  // 4. Search contains DB value
  //-------------------------------------------------------

  for (const school of schools) {
    const values = getSearchValues(school);

    if (values.some((v) => key.includes(v))) {
      return school;
    }
  }

  //-------------------------------------------------------
  // 5. Ignore spaces
  //-------------------------------------------------------

  const compact = key.replace(/\s+/g, "");

  for (const school of schools) {
    const values = getSearchValues(school);

    if (
      values.some(
        (v) =>
          v.replace(/\s+/g, "") === compact ||
          v.replace(/\s+/g, "").includes(compact) ||
          compact.includes(v.replace(/\s+/g, "")),
      )
    ) {
      return school;
    }
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| Main
|--------------------------------------------------------------------------
*/

async function main() {
  try {
    await connectDB();

    console.log("Connected to MongoDB\n");

    const schools = await School.find().lean();

    console.log(`Loaded ${schools.length} schools\n`);

    const matched = [];
    const unmatched = [];

    for (const item of data) {
      if (!item.school?.trim()) continue;

      const school = findSchool(item.school, schools);

      if (!school) {
        unmatched.push(item.school);
        continue;
      }

      matched.push({
        scraped: item.school,
        db: school.name,
      });
    }

    console.log("======================================");
    console.log("MATCH REPORT");
    console.log("======================================\n");

    console.log(`Matched   : ${matched.length}`);
    console.log(`Unmatched : ${unmatched.length}`);

    console.log("\n======================================");
    console.log("SAMPLE MATCHES");
    console.log("======================================\n");

    matched.slice(0, 30).forEach((m) => {
      console.log(`✓ ${m.scraped}  ->  ${m.db}`);
    });

    if (unmatched.length) {
      console.log("\n======================================");
      console.log("UNMATCHED");
      console.log("======================================\n");

      unmatched.sort().forEach((school) => {
        console.log(`✗ ${school}`);
      });
    }

    console.log("\nDone.");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

main();
