import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
    mongoose.connection.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
