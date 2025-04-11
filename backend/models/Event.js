import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["exercise", "eating", "work", "relax", "family", "social"],
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

export const Event = mongoose.model("Event", EventSchema);
