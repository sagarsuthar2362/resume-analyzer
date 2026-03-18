import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const resumeAnalyzer = async (resumeText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are an expert ATS (Applicant Tracking System). 
    Analyze the following Resume.
    
    Resume: ${resumeText}

    Return ONLY a JSON object with this structure:
    {
      "score": number (0-100),
      "match_summary": "string",
      "missing_skills": ["array"],
      "recommendations": ["array"]
    }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze resume with AI");
  }
};
