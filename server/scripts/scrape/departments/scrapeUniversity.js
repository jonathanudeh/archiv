const cheerio = require("cheerio");
const { getPage } = require("./browser");
const { sleep } = require("./utils");

function normalizeDepartment(name) {
  let department = name
    .replace(/:+$/g, "")
    .replace(/\s*&\s*/g, " AND ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

  const aliases = {
    "ELECTRICAL /ELECTRONICS ENGINEERING":
      "ELECTRICAL AND ELECTRONICS ENGINEERING",

    "ELECTRICAL/ELECTRONICS ENGINEERING":
      "ELECTRICAL AND ELECTRONICS ENGINEERING",

    "NURSING/NURSING SCIENCE": "NURSING SCIENCE",

    "ACCOUNTANCY/ACCOUNTING": "ACCOUNTING",
  };

  return aliases[department] || department;
}

async function gotoWithRetry(page, url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      return;
    } catch (err) {
      console.log(`Attempt ${attempt}/${retries} failed: ${url}`);

      if (attempt === retries) throw err;

      await sleep(3000 * attempt);
    }
  }
}

async function scrapeUniversity(university) {
  const page = await getPage();

  await gotoWithRetry(page, university.url);

  // Give the page time to finish rendering
  //   await page.waitForTimeout(1500);
  await sleep(1000 + Math.random() * 2000);

  const html = await page.content();

  await page.close();

  const $ = cheerio.load(html);

  // Temporary debug
  console.log(university.url);
  console.log($("h1").first().text().trim());

  const title = $("h1").first().text().trim();

  let logo = "";

  const image = $("article img").first();

  if (image.length) {
    logo = image.attr("src") || image.attr("data-src") || "";
  }

  // Convert relative logo URL to absolute URL
  if (logo) {
    logo = new URL(logo, "https://myschoolgist.com").href;
  }

  const departments = [];

  $("h2").each((i, heading) => {
    const headingText = $(heading).text().toLowerCase();

    if (headingText.includes("courses") || headingText.includes("programmes")) {
      $(heading)
        .nextAll("ul")
        .first()
        .find("li")
        .each((i, li) => {
          const department = $(li).text().trim();

          if (department) {
            departments.push(normalizeDepartment(department));
          }
        });
    }
  });

  // Remove duplicates and sort alphabetically
  const uniqueDepartments = [...new Set(departments)].sort();

  return {
    school: university.name,
    title,
    url: university.url,
    logo,
    departments: uniqueDepartments,
  };
}

module.exports = scrapeUniversity;
