import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // File handle karne ka function
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/resume/analyze`,
        formData,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Drag and Drop handlers
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      {/* 1. Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          AI Resume <span className="text-blue-600">Analyzer</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Upload your resume and geet a feedback
        </p>
      </div>

      {/* 2. Action Zone: Upload Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          {/* Upload Icon */}
          <div className="mb-4 text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <p className="text-gray-700 font-medium mb-1">
            {file ? `Selected: ${file.name}` : "Drag and drop your resume here"}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Supports PDF, DOCX (Max 5MB)
          </p>

          <input
            type="file"
            className="hidden"
            id="fileInput"
            accept=".pdf,.docx"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Select File
          </label>
        </div>

        {/* 3. Analyze Button */}
        <button
          disabled={!file}
          onClick={handleUpload}
          className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
            file
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {file ? "🚀 Analyze Now with Gemini AI" : "Please select a file"}
        </button>
      </div>

      {/* 4. Footer/How it works */}
      <div className="mt-12 flex gap-8 text-center text-gray-500 text-sm">
        <div>
          <span className="block font-bold text-gray-800 text-lg">100%</span>
          Secure Analysis
        </div>
        <div className="border-l border-gray-200 pl-8">
          <span className="block font-bold text-gray-800 text-lg">
            Powered by
          </span>
          Gemini
        </div>
      </div>
    </div>
  );
};

export default Home;
