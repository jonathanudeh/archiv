const { default: pLimit } = require("p-limit");

const scrapeDirectory = require("./scrapeDirectory");
const scrapeUniversity = require("./scrapeUniversity");
const { saveResults, saveFailed } = require("./utils");
const { closeBrowser } = require("./browser");

const limit = pLimit(2);

async function main() {
  try {
    const universities = await scrapeDirectory();

    console.log(`Found ${universities.length} universities`);

    let completed = 0;

    const failed = [];

    const tasks = universities.map((university) =>
      limit(async () => {
        console.log(
          `[${++completed}/${universities.length}] ${university.name}`,
        );

        try {
          return await scrapeUniversity(university);
        } catch (err) {
          console.log(`Failed: ${university.name}`);
          console.log(err.message);

          failed.push(university);

          return null;
        }
      }),
    );

    const results = await Promise.all(tasks);

    const successful = results.filter(Boolean);

    await saveResults(successful);

    await saveFailed(failed);

    console.log(`Finished scraping ${successful.length} universities`);

    console.log(`Failed scraping ${failed.length} universities`);
  } catch (err) {
    console.error(err);
  } finally {
    await closeBrowser();
  }
}

main();
