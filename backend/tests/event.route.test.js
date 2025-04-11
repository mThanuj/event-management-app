const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app.js");
const Event = require("../models/event.model.js");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Event.deleteMany({});
});

describe("POST /api/v1/events", () => {
  test("should create a new event", async () => {
    const eventData = {
      title: "Test Event",
      category: "work",
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60),
    };

    const response = await request(app).post("/api/v1/events").send(eventData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Event created successfully");
    expect(response.body.event).toBeDefined();
  });

  test("should return 400 if event data is invalid", async () => {
    const eventData = {
      title: "",
      category: "work",
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60),
    };

    const response = await request(app).post("/api/v1/events").send(eventData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Event data is invalid");
  });

  test("should return 400 if the end time is before the start time", async () => {
    const eventData = {
      title: "Test Event",
      category: "work",
      startTime: new Date(Date.now() + 1000 * 60 * 60),
      endTime: new Date(),
    };

    const response = await request(app).post("/api/v1/events").send(eventData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("End time must be after start time");
  });
});

describe("GET /api/v1/events", () => {
  test("should get all events", async () => {
    const eventData = {
      title: "Test Event",
      category: "work",
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60),
    };

    await Event.create(eventData);

    const response = await request(app).get("/api/v1/events");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Events fetched successfully");
    expect(response.body.events.length).toBe(1);
  });
});
