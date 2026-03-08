import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.log("ERROR GENERATING TOKEN", error);
  }
};
