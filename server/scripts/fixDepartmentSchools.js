const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "../data/raw/departments.json");
const OUTPUT = path.join(__dirname, "../data/raw/departments.fixed.json");

const departments = require(INPUT);

function inferSchool(item) {
  // Already has a school
  if (item.school && item.school.trim()) {
    return item.school.trim();
  }

  const title = item.title.trim();

  //----------------------------------------------------------
  // 1. Acronym inside parentheses
  //
  // Example:
  // Crescent University Abeokuta (CUAB)
  // FUO (Fountain University Osogbo)
  // EU (Elizade University)
  //----------------------------------------------------------

  const acronym = title.match(/\(([A-Z][A-Z0-9-]{1,})\)/);

  if (acronym) {
    return acronym[1];
  }

  //----------------------------------------------------------
  // 2. "... Offered by University Name"
  //
  // Complete List of Courses Offered by Edwin Clark University
  //----------------------------------------------------------

  let match = title.match(/Offered by (.+)$/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // 3. "List of XYZ University Degree Courses"
  //----------------------------------------------------------

  match = title.match(/List of (.+?) Degree Courses/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // 4. "... University Courses"
  //----------------------------------------------------------

  match = title.match(/(.+?) Courses$/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // 5. "Explore the Range of Degree Courses at ..."
  //----------------------------------------------------------

  match = title.match(/Courses at (.+)$/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // 6. "Courses in Bowen University ..."
  //----------------------------------------------------------

  match = title.match(/Courses in (.+?)\s*&/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // 7. "Courses Offered at Landmark University ..."
  //----------------------------------------------------------

  match = title.match(/Courses Offered at (.+?) with/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // 8. "Courses in XYZ University"
  //----------------------------------------------------------

  match = title.match(/Courses in (.+)$/i);

  if (match) {
    return match[1].trim();
  }

  //----------------------------------------------------------
  // Couldn't infer
  //----------------------------------------------------------

  return "";
}

let fixed = 0;
let unresolved = [];

const output = departments.map((item) => {
  const school = inferSchool(item);

  if (!item.school && school) {
    fixed++;
  }

  if (!school) {
    unresolved.push(item.title);
  }

  return {
    ...item,
    school,
  };
});

fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

console.log("------------------------------------");
console.log(`Total schools : ${departments.length}`);
console.log(`Fixed         : ${fixed}`);
console.log(`Still missing : ${unresolved.length}`);
console.log("------------------------------------");

if (unresolved.length) {
  console.log("\nCouldn't infer:\n");

  unresolved.forEach((title) => console.log(title));
}

console.log("\nSaved to:");
console.log(OUTPUT);
