const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const handleSuccess = require("./handleSuccess");
const handleError = require("./handleError");
const Post = require("./models/posts");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("資料庫連結成功");
});
const requestListener = async (req, res) => {
  let body = "";
  req.on("data", (chuck) => (body += chuck));
  if (req.url == "/posts" && req.method == "GET") {
    await handleSuccess(res);
  } else if (req.url == "/posts" && req.method == "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        await Post.create({
          content: data.content,
          image: data.image,
        });
        await handleSuccess(res, "新增成功");
      } catch (err) {
        handleError(res, 400, err.message);
      }
    });
  } else if (req.url == "/posts" && req.method == "DELETE") {
    await Post.deleteMany({});
    await handleSuccess(res);
  } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    await Post.findByIdAndDelete(id);
    await handleSuccess(res, "成功刪除一筆");
  } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
    req.on("end", async () => {
      try {
        const id = req.url.split("/").pop();
        const data = JSON.parse(body);
        await Post.findByIdAndUpdate(id, data);
        await handleSuccess(res, "成功更新一筆");
      } catch (err) {
        handleError(res, 400, err.message);
      }
    });
  } else {
    handleError(res, 404, "找不到頁面");
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
