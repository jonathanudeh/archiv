const fs = require("fs/promises");
const path = require("path");
const slugify = require("slugify");

const RAW_SCHOOLS = path.join(__dirname, "../../data/raw/schools.json");
const RAW_DEPARTMENTS = path.join(__dirname, "../../data/raw/departments.json");

const OUTPUT = path.join(__dirname, "../../data/processed/schools.json");

/* -------------------------------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------------------------------- */

function normalize(str = "") {
  return str
    .toUpperCase()
    .replace(/&/g, "AND")
    .replace(/[.,()]/g, "")
    .replace(/[-–—]/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWebsite(url) {
  if (!url) return undefined;

  return url.trim().replace(/\/+$/, "");
}

function acronymFromWebsite(url) {
  if (!url) return "";

  try {
    const host = new URL(url).hostname.replace(/^www\./, "").split(".")[0];

    return host.toUpperCase();
  } catch {
    return "";
  }
}

function generateAliases(name, acronym) {
  const aliases = new Set();

  const cleanName = normalize(name);

  aliases.add(cleanName);

  if (acronym) aliases.add(normalize(acronym));

  if (name.includes(",")) {
    aliases.add(normalize(name.split(",")[0]));
  }

  aliases.add(
    normalize(
      name
        .replace(/University/gi, "")
        .replace(/Federal/gi, "")
        .replace(/State/gi, ""),
    ),
  );

  aliases.add(
    normalize(name.replace(/University/gi, "").replace(/Federal/gi, "")),
  );

  return [...aliases].filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/* Manual overrides (remaining unmatched) */
/* -------------------------------------------------------------------------- */

const OVERRIDES = {
  AFIT: {
    acronym: "AFIT",
    contains: "AIR FORCE INSTITUTE OF TECHNOLOGY",
  },

  AUSU: {
    acronym: "AUSU",
    contains: "AMBROSE ALLI",
  },

  BOSU: {
    acronym: "BOSU",
    contains: "BOMOI",
  },

  BOUESTI: {
    acronym: "BOUESTI",
    contains: "BAMIDELE OLUMILUA",
  },

  CLU: {
    acronym: "CLU",
    contains: "CLIFFORD",
  },

  CUSTECH: {
    acronym: "CUSTECH",
    contains: "CONFLUENCE UNIVERSITY",
  },

  DSUST: {
    acronym: "DSUST",
    contains: "DELTA STATE UNIVERSITY OF SCIENCE",
  },

  ECWA: {
    acronym: "ECWA",
    contains: "ECWA",
  },

  EDSU: {
    acronym: "EDSU",
    contains: "EDO STATE UNIVERSITY",
  },

  FUAZ: {
    acronym: "FUAZ",
    contains: "FEDERAL UNIVERSITY OF AGRICULTURE ZURU",
  },

  KDU: {
    acronym: "KDU",
    contains: "KINGS UNIVERSITY",
  },

  KDUMS: {
    acronym: "KDUMS",
    contains: "KHALIFA ISYAKU",
  },

  NAUB: {
    acronym: "NAUB",
    contains: "NIGERIAN ARMY UNIVERSITY",
  },

  "TECH-U": {
    acronym: "TECH-U",
    contains: "FIRST TECHNICAL UNIVERSITY",
  },

  UNIDEL: {
    acronym: "UNIDEL",
    contains: "UNIVERSITY OF DELTA",
  },
};

/* -------------------------------------------------------------------------- */

function findDepartmentInfo(school, departments) {
  const name = normalize(school.name);

  for (const dept of departments) {
    const code = normalize(dept.school);

    if (
      code === normalize(school.acronym) ||
      name.includes(code) ||
      code.includes(name)
    ) {
      return dept;
    }

    if (dept.title && normalize(dept.title).includes(name)) {
      return dept;
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */

async function main() {
  const schools = JSON.parse(await fs.readFile(RAW_SCHOOLS, "utf8"));

  const departments = JSON.parse(await fs.readFile(RAW_DEPARTMENTS, "utf8"));

  const processed = schools.map((school) => {
    const website = normalizeWebsite(school.website);

    const department = findDepartmentInfo(school, departments);

    let acronym = "";

    /* ------------------------------------------------ */
    /* 1. department acronym */
    /* ------------------------------------------------ */

    if (department?.school) {
      acronym = department.school;
    }

    /* ------------------------------------------------ */
    /* 2. manual override */
    /* ------------------------------------------------ */

    for (const value of Object.values(OVERRIDES)) {
      if (normalize(school.name).includes(normalize(value.contains))) {
        acronym = value.acronym;
      }
    }

    /* ------------------------------------------------ */
    /* 3. raw acronym */
    /* ------------------------------------------------ */

    if (!acronym && school.acronym) {
      acronym = school.acronym;
    }

    /* ------------------------------------------------ */
    /* 4. website */
    /* ------------------------------------------------ */

    if (!acronym && website) {
      acronym = acronymFromWebsite(website);
    }

    acronym = acronym.toUpperCase();

    return {
      name: school.name.trim(),

      slug: slugify(school.name, {
        lower: true,
        strict: true,
      }),

      acronym,

      aliases: generateAliases(school.name, acronym),

      ownership: school.ownership,

      yearEstablished: school.yearEstablished,

      country: school.country,

      website,

      description: "",

      location: {
        city: "",
        state: "",
      },

      logo: {
        url: department?.logo || "/default-school-logo.png",
      },
    };
  });

  await fs.mkdir(path.dirname(OUTPUT), {
    recursive: true,
  });

  await fs.writeFile(OUTPUT, JSON.stringify(processed, null, 2));

  console.log(`Generated ${processed.length} schools`);
}

main().catch(console.error);
