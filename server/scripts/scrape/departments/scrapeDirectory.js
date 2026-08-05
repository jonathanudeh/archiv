const cheerio = require("cheerio");
const { getPage } = require("./browser");

const DIRECTORY_URLS = [
  "https://myschoolgist.com/news/federal-universities-in-nigeria/",
  "https://myschoolgist.com/news/state-universities-in-nigeria/",
  "https://myschoolgist.com/news/private-universities-in-nigeria/",
];

async function gotoWithRetry(page, url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      return;
    } catch (err) {
      console.log(`Attempt ${attempt}/${retries} failed for ${url}`);

      if (attempt === retries) throw err;

      await page.waitForTimeout(3000 * attempt);
    }
  }
}

async function scrapeDirectory() {
  const universities = [];

  for (const directoryUrl of DIRECTORY_URLS) {
    console.log(`Reading ${directoryUrl}`);

    const page = await getPage();

    await gotoWithRetry(page, directoryUrl);

    const html = await page.content();
    await page.close();

    const $ = cheerio.load(html);

    $("table a").each((i, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:")
      ) {
        return;
      }

      const text = $(el).text().trim();

      // Only keep links that point to course pages
      if (!text.toLowerCase().includes("course")) return;

      const url = new URL(href, "https://myschoolgist.com").href;

      // Temporary debug
      console.log(text, url);

      universities.push({
        name: text.replace(/courses?/i, "").trim(),
        url,
      });
    });
  }

  console.log(universities.slice(0, 10));
  console.log(`Found ${universities.length} course pages`);

  return universities;
}

module.exports = scrapeDirectory;
