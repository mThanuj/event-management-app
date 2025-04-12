const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events.route.js");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);
app.use(express.json());

app.use("/api/v1/events", eventRoutes);

module.exports = app;
