const headers = require("./headers");
const Post = require("../models/posts");
const handleSuccess = async (res, msg) => {
  res.writeHead(200, headers);
  if (msg != "options") {
    res.write(
      JSON.stringify({
        status: true,
        msg,
        posts: await Post.find({}),
      })
    );
  }
  res.end();
};
module.exports = handleSuccess;
