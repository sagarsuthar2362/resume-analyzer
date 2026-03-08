import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.js";

const PORT = process.env.PORT;
const FRONTEND_ORIGIN = process.env.FRONTEND_URL
const app = express();
connectDB()

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  }),
);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
