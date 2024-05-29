const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const URL =
  "mongodb+srv://jahidhasan:jahid246578@cluster0.u5gekv5.mongodb.net/Inventory";
const router = require("./src/routes/api");

const cookieParser = require("cookie-parser");

//security middleware
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

//Middleware
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitizer());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Rate limiter
const limiter = rateLimit({
  windowMs: 24 * 60 * 1000,
  max: 1000,
});

app.use(limiter);

//Database connection
mongoose
  .connect(URL)
  .then((res) => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//api call
app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "not found" });
});

module.exports = app;
