const mongoose = require("mongoose");

async function connectDB() {
  const DB = process.env.DATABASE.replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD,
  );

  await mongoose.connect(DB);

  console.log("DB connection successful");
}

module.exports = connectDB;
