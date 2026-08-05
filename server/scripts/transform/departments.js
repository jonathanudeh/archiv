require("dotenv").config();

const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const slugify = require("slugify");

const connectDB = require("../../config/database");
const School = require("../../models/schoolModel");
const { getNumberOfLevels } = require("../scrape/departments/utils");

const RAW_PATH = path.join(__dirname, "../../data/raw/departments.json");

const OUTPUT_PATH = path.join(
  __dirname,
  "../../data/processed/departments.json",
);

function normalize(text = "") {
  return text
    .toUpperCase()
    .replace(/&/g, "AND")
    .replace(/\//g, " ")
    .replace(/-/g, " ")
    .replace(/[()]/g, "")
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generateAliases(name) {
  const aliases = new Set();

  aliases.add(name.toUpperCase());

  aliases.add(name.replace(/ AND /gi, " & ").toUpperCase());

  aliases.add(name.replace(/SCIENCE/gi, "SCI.").toUpperCase());

  aliases.add(name.replace(/-/g, " ").toUpperCase());

  aliases.add(name.replace(/\//g, " AND ").toUpperCase());

  return [...aliases];
}

/**
 * Manual mappings for schools whose scraped acronym
 * differs from the acronym in the School collection.
 */
const SCHOOL_MAP = {
  FUDMA: "FEDERAL UNIVERSITY DUTSIN MA",
  FUGUS: "FEDERAL UNIVERSITY GUSAU",
  NOUN: "NATIONAL OPEN UNIVERSITY OF NIGERIA",
  NPA: "FEDERAL UNIVERSITY OF EDUCATION PANKSHIN",
  OAU: "OBAFEMI AWOLOWO UNIVERSITY",
  FUNAAB: "FEDERAL UNIVERSITY OF AGRICULTURE ABEOKUTA",
  KDUMS: "KHALIFA ISYAKU RABIU UNIVERSITY",

  ABSU: "ABIA STATE UNIVERSITY",
  AAU: "AMBROSE ALLI UNIVERSITY",
  COOU: "CHUKWUEMEKA ODUMEGWU OJUKWU UNIVERSITY",
  BSU: "BENUE STATE UNIVERSITY",
  KSUST: "KEBBI STATE UNIVERSITY OF SCIENCE AND TECHNOLOGY",
  RSUST: "RIVERS STATE UNIVERSITY",
  OOU: "OLABISI ONABANJO UNIVERSITY",
  TASUED: "TAI SOLARIN UNIVERSITY OF EDUCATION",
  TASU: "TARABA STATE UNIVERSITY",
  LASUSTECH: "LAGOS STATE UNIVERSITY OF SCIENCE AND TECHNOLOGY",
  LASUED: "LAGOS STATE UNIVERSITY OF EDUCATION",

  "AU (ADELEKE UNIVERSITY)": "ADELEKE UNIVERSITY",
  "BUT (BELLS UNIVERSITY OF TECHNOLOGY)": "BELLS UNIVERSITY OF TECHNOLOGY",
  "EU (ELIZADE UNIVERSITY)": "ELIZADE UNIVERSITY",
  "FUO (FOUNTAIN UNIVERSITY OSOGBO)": "FOUNTAIN UNIVERSITY",
  GOU: "GODFREY OKOYE UNIVERSITY",
  "JABU (JOSEPH AYO BABALOLA UNIVERSITY)": "JOSEPH AYO BABALOLA UNIVERSITY",
  "MU (MADONNA UNIVERSITY)": "MADONNA UNIVERSITY",
  "MICHAEL & CECILIA UNIVERSITY": "MICHAEL AND CECILIA UNIVERSITY",
  OUI: "ODUDUWA UNIVERSITY",
  "PAU (PAUL UNIVERSITY AWKA )": "PAUL UNIVERSITY",
  "SAU (SAMUEL ADEGBOYEGA UNIVERSITY)": "SAMUEL ADEGBOYEGA UNIVERSITY",
  "TANU (TANSIAN UNIVERSITY)": "TANSIAN UNIVERSITY",
  "UNICHRIS (CHRISTOPHER UNIVERSITY)": "CHRISTOPHER UNIVERSITY",
  "AJU (ARTHUR JARVIS UNIVERSITY)": "ARTHUR JARVIS UNIVERSITY",
  "CROWN-HILL UNIVERSITY": "CROWN HILL UNIVERSITY",
  EKOUNIMED: "UNIVERSITY OF MEDICAL SCIENCES",
  HUNI: "HALLMARK UNIVERSITY",
  CUN: "CRAWFORD UNIVERSITY",
};

async function main() {
  await connectDB();

  const schools = await School.find().lean();

  /**
   * Build lookup map once.
   */
  const schoolMap = new Map();

  for (const school of schools) {
    if (school.acronym) {
      schoolMap.set(normalize(school.acronym), school);
    }

    schoolMap.set(normalize(school.name), school);

    for (const alias of school.aliases || []) {
      schoolMap.set(normalize(alias), school);
    }
  }

  const raw = JSON.parse(await fs.readFile(RAW_PATH, "utf8"));

  const departments = [];

  let matched = 0;
  let unmatched = 0;

  for (const university of raw) {
    const lookup =
      SCHOOL_MAP[university.school.toUpperCase()] || university.school;

    const school = schoolMap.get(normalize(lookup));

    if (!school) {
      unmatched++;

      console.log("\n================================");
      console.log("Missing:", university.school);

      const candidates = schools.filter((s) => {
        const n = normalize(s.name);

        return (
          n.includes(normalize(university.school)) ||
          normalize(university.school).includes(n)
        );
      });

      console.table(
        candidates.map((c) => ({
          acronym: c.acronym,
          name: c.name,
        })),
      );

      continue;
    }

    matched++;

    for (const dept of university.departments) {
      departments.push({
        name: dept.trim().toLowerCase(),

        slug: slugify(dept, {
          lower: true,
          strict: true,
        }),

        aliases: generateAliases(dept),

        school: school._id,

        numberOfLevels: getNumberOfLevels(dept),
      });
    }
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), {
    recursive: true,
  });

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(departments, null, 2));

  console.log("\n==============================");
  console.log("Department Transform Complete");
  console.log("==============================");
  console.log(`Matched Schools   : ${matched}`);
  console.log(`Unmatched Schools : ${unmatched}`);
  console.log(`Departments       : ${departments.length}`);

  await mongoose.disconnect();

  console.log("\nDisconnected from MongoDB");
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
});
