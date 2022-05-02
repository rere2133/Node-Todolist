const headers = require("./headers");
const handleError = (res, code = 400, msg = "欄位輸入錯誤或無此ID") => {
  res.writeHead(code, headers);
  res.write(
    JSON.stringify({
      status: false,
      msg,
    })
  );
  res.end();
};
module.exports = handleError;
