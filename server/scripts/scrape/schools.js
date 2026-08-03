const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs/promises");
const path = require("path");

const URLS = [
  {
    ownership: "Federal",
    url: "https://www.nuc.edu.ng/nigerian-univerisities/federal-univeristies/",
  },
  {
    ownership: "State",
    url: "https://www.nuc.edu.ng/nigerian-univerisities/state-univerisity/",
  },
  {
    ownership: "Private",
    url: "https://www.nuc.edu.ng/nigerian-univerisities/private-univeristies/",
  },
];

function extractAcronym(website) {
  if (!website) return "";

  try {
    const hostname = new URL(website).hostname.toLowerCase();

    // www.unilag.edu.ng = UNILAG
    // www.funai.edu.ng => FUNAI
    // www.fuoye.edu.ng = FUOYE

    const parts = hostname.split(".");

    if (parts.length < 3) return "";

    return parts[1].toUpperCase();
  } catch {
    return "";
  }
}

async function scrapePage({ url, ownership }) {
  console.log(`Scraping ${ownership} universities...`);

  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);

  const schools = [];

  $("tbody tr").each((_, row) => {
    const columns = $(row).find("td");

    if (columns.length < 5) return;

    const name = $(columns[1]).text().trim().replace(/\s+/g, " ");

    const website = $(columns[3]).find("a").attr("href")?.trim() || "";

    const yearEstablished = Number($(columns[4]).text().trim()) || null;

    schools.push({
      name,
      ownership,
      acronym: extractAcronym(website),
      website,
      yearEstablished,
      country: "Nigeria",
    });
  });

  console.log(`${ownership}: ${schools.length} schools`);

  return schools;
}

async function main() {
  try {
    const results = await Promise.all(URLS.map(scrapePage));

    const schools = results.flat();

    console.log(schools.slice(0, 5));

    const outputPath = path.join(__dirname, "../../data/raw/schools.json");

    await fs.mkdir(path.dirname(outputPath), {
      recursive: true,
    });

    await fs.writeFile(outputPath, JSON.stringify(schools, null, 2));

    console.log(`\n Scraped ${schools.length} schools.`);
    console.log(`Saved to ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
}

main();
