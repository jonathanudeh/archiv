const express = require("express");
const schoolRouter = require("./routes/v1/schoolRoutes");
const departmentRouter = require("./routes/v1/departmentRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/schools", schoolRouter);
app.use("/api/v1/departments", departmentRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
