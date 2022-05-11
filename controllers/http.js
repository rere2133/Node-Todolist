const handleError = require("../service/handleError");
const handleSuccess = require("../service/handleSuccess");
const http = {
  cors(res) {
    handleSuccess(res, "options");
  },
  notFound(res) {
    handleError(res, 404, "找不到頁面");
  },
};

module.exports = http;
