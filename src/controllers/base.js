exports.apiResponse = (response, code, status, message, data) => {
  return response.status(code).json({
    status: status,
    message: message,
    data: data,
  });
};
