import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

app.use("/api/v1/events", eventRoutes);

export default app;
