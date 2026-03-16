import React, { useState } from "react";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        `${backendURL}/api/v1/user/signup`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
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
        <h1 className="text-center text-2xl capitalize mb-5">signup form</h1>

        <div className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="outline-none border-b py-1 px-2"
            name="name"
          />
        </div>

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

export default Signup;
