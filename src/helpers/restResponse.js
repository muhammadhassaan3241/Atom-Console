exports.restResponse = (code, message, body) => {
  return {
    code: code,
    message: message,
    body: body,
  };
};
