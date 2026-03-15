const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    const statusCode = error.code || 500;
    const message = error.message || "Internal server error";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export default asyncHandler;
