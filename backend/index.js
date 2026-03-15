import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.js";

const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
);

import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/user", authRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
