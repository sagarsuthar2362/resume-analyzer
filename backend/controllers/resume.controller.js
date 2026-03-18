import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(404, "no file found please upload file");
  }

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;

  return res.status(200).json({ success: true, message: "file received" });
});
