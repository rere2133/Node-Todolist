const handleSuccess = require("../service/handleSuccess");
const handleError = require("../service/handleError");
const Post = require("../models/posts");

const posts = {
  async getPosts(res) {
    await handleSuccess(res);
  },
  async createPosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      if (data.content) {
        await Post.create({
          content: data.content,
          image: data.image,
        });
        await handleSuccess(res, "新增成功");
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, 400, err.message);
    }
  },
  async deleteAllPosts(res) {
    await Post.deleteMany({});
    await handleSuccess(res);
  },
  async deletePost(id, res) {
    await Post.findByIdAndDelete(id);
    await handleSuccess(res, "成功刪除一筆");
  },
  async editPost({ id, body, res }) {
    try {
      const data = JSON.parse(body);
      if (data.content) {
        await Post.findByIdAndUpdate(id, {
          content: data.content,
          image: data.image || "",
        });
        await handleSuccess(res, "成功更新一筆");
      }
    } catch (err) {
      handleError(res, 400, err.message);
    }
  },
};
module.exports = posts;
