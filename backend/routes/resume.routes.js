import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { analyzeResume } from "../controllers/resume.controller.js";
const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;
