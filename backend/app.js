const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events.route.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

app.use("/api/v1/events", eventRoutes);

module.exports = app;
