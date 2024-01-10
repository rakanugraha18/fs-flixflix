exports.errorHandler = (error, req, res, next) => {
  console.error(error);

  // Customize error handling based on your application needs
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  res.status(status).json({ error: message });
};
