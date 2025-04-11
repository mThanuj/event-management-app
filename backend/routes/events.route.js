import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.put("/events/:id", updateEvent);

export default router;
