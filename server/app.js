const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");
const schoolRouter = require("./routes/v1/schoolRoutes");
const departmentRouter = require("./routes/v1/departmentRoutes");
const authRouter = require("./routes/v1/authRoutes");
const userRouter = require("./routes/v1/userRoutes");
const AppError = require("./utils/appError");

const app = express();

app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent paramater pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

app.use("/api/v1/schools", schoolRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
