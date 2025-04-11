import { Event } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, category, startTime, endTime } = req.body;
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
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
};
