import { resumeAnalyzer } from "../services/ai.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { PdfReader } from "pdfreader";

export const analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(404, "no file found please upload file");
  }

  const fileBuffer = req.file.buffer;

  const extractText = (buffer) => {
    return new Promise((resolve, reject) => {
      let fullText = "";
      new PdfReader().parseBuffer(fileBuffer, (err, item) => {
        if (err) {
          reject(err);
        } else if (!item) {
          resolve(fullText);
        } else if (item.text) {
          fullText += item.text + " ";
        }
      });
    });
  };

  const resumeText = await extractText(fileBuffer);

  const result = await resumeAnalyzer(resumeText);
  console.log("result", result);

  return res.status(200).json({ success: true, result });
});
