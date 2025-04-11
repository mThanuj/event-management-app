const express = require("express");
const {
  createEvent,
  getAllEvents,
  updateEvent,
} = require("../controllers/event.controller.js");

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.put("/:id", updateEvent);

module.exports = router;
