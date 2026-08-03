const fs = require("fs/promises");
const path = require("path");
const slugify = require("slugify");

const RAW_PATH = path.join(__dirname, "../../data/raw/schools.json");

const OUTPUT_PATH = path.join(__dirname, "../../data/processed/schools.json");

function normalizeWebsite(url) {
  if (!url) return undefined;

  const normalized = url.trim().replace(/\/+$/, "");

  return normalized || undefined;
}
function generateAliases(name, acronym) {
  const aliases = new Set();

  if (acronym) {
    aliases.add(acronym.toUpperCase());
  }

  aliases.add(name.toUpperCase());

  if (name.includes(",")) {
    aliases.add(name.substring(0, name.lastIndexOf(",")).trim().toUpperCase());
  }

  return [...aliases];
}

function transformSchool(school) {
  const website = normalizeWebsite(school.website);

  const transformed = {
    name: school.name.trim(),

    slug: slugify(school.name, {
      lower: true,
      strict: true,
    }),

    acronym: school.acronym,

    aliases: generateAliases(school.name, school.acronym),

    ownership: school.ownership,

    location: {
      city: "",
      state: "",
    },

    description: "",

    yearEstablished: school.yearEstablished,

    country: school.country,

    logo: {
      url: "/default-school-logo.png",
    },
  };

  if (website) {
    transformed.website = website;
  }

  return transformed;
}

async function main() {
  try {
    const raw = await fs.readFile(RAW_PATH, "utf-8");

    const schools = JSON.parse(raw);

    const transformed = schools.map(transformSchool);

    await fs.mkdir(path.dirname(OUTPUT_PATH), {
      recursive: true,
    });

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(transformed, null, 2));

    console.log(`Transformed ${transformed.length} schools`);

    console.log(transformed.slice(0, 5));
  } catch (err) {
    console.error(err);
  }
}

main();
