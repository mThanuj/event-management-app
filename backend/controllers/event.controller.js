const Event = require("../models/event.model.js");

module.exports.createEvent = async (req, res) => {
  try {
    const { title, category, startTime, endTime } = req.body;
    if (!title || !category || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Event data is invalid",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const event = await Event.create({
      title,
      category,
      startTime,
      endTime,
    });
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAllEvents = async (req, res) => {
  const { category } = req.query;

  try {
    let events = [];

    if (category == "") {
      events = await Event.find({});
    } else {
      events = await Event.find({ category });
    }

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, startTime, endTime } = req.body;
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        category,
        startTime,
        endTime,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
