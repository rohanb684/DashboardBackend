const sendResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default sendResponse;
