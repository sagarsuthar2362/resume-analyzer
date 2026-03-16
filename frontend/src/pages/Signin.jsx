import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Signin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);  
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        `${backendURL}/api/v1/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data?.success) {
        localStorage.setItem("token", res.data?.token);
        navigate('/')
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="dark:text-white dark:bg-neutral-900 min-h-screen flex items-center justify-center">
      <form
        className="min-w-xs border rounded px-4 py-7 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl capitalize mb-5">signin form</h1>

        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="outline-none border-b py-1 px-2"
            name="email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            placeholder="Enter your password"
            className="outline-none border-b py-1 px-2"
            name="password"
          />
        </div>

        <button className="dark:bg-white dark:text-black px-5 py-1 rounded cursor-pointer">
          submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
