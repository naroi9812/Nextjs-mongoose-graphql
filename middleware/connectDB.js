import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI;

if (!DB_URI) {
  throw new Error("Please define the environment variable");
}

const connectDB = async (req, res, next) => {
  try {
    // checked is mongodb already connected
    if (!global.mongoose) {
      global.mongoose = await mongoose.connect(DB_URI + "/nextjsMongoDB");
      console.log("Database connected!");
    }
  } catch (err) {
    throw err;
  }
};

export default connectDB;
