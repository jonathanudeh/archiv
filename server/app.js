const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const schoolRouter = require("./routes/v1/schoolRoutes");
const departmentRouter = require("./routes/v1/departmentRoutes");
const userRouter = require("./routes/v1/userRoutes");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());

app.use("/api/v1/schools", schoolRouter);
app.use("/api/v1/departments", departmentRouter);

//// TODO: /auth and /users to be seperate routers
app.use("/api/v1/users", userRouter);
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
