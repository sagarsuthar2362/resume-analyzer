import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`CONNECTED TO DATABASE SUCCESFULLY: ${conn.connection.host}`);
  } catch (error) {
    console.log("ERROR CONNECTING TO DB: ", error.message);
    process.exit(1)
  }
};
