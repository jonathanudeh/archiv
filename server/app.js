const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const globalErrorHandler = require("./controllers/errorController");
const searchRouter = require("./routes/v1/searchRoutes");
const schoolRouter = require("./routes/v1/schoolRoutes");
const departmentRouter = require("./routes/v1/departmentRoutes");
const authRouter = require("./routes/v1/authRoutes");
const userRouter = require("./routes/v1/userRoutes");
const materialRouter = require("./routes/v1/materialRoutes");
const savedMaterialRouter = require("./routes/v1/savedMaterialRoutes");
const AppError = require("./utils/appError");

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from the same IP
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"].filter(
  Boolean,
);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

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

// app.use((req, res, next) => {
//   const start = Date.now();

//   res.on("finish", () => {
//     console.log(
//       `${req.method} ${req.originalUrl} FINISHED IN`,
//       Date.now() - start,
//       "ms",
//     );
//   });

//   next();
// });

app.use(compression());

// ROUTES
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
  });
});

app.use("/api/v1/search", searchRouter);
app.use("/api/v1/schools", schoolRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/materials", materialRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/savedMaterials", savedMaterialRouter);

// Handle unhandled routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
