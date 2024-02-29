const ErrorHandler = require("../utils/ErrorHandler");

const era = () => {
  const error = new ErrorHandler("server error", 404);
  return error;
};

module.exports = era;
