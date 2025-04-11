const express = require("express");
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller.js");

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
