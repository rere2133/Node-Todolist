const HttpController = require("../controllers/http");
const PostsController = require("../controllers/posts");

const routes = async (req, res) => {
  const { url, method } = req;
  console.log(method, url);
  let body = "";
  req.on("data", (chuck) => (body += chuck));
  if (req.url == "/posts" && req.method == "GET") {
    PostsController.getPosts(res);
  } else if (req.url == "/posts" && req.method == "POST") {
    req.on("end", async () => PostsController.createPosts({ body, req, res }));
  } else if (req.url == "/posts" && req.method == "DELETE") {
    PostsController.deleteAllPosts(res);
  } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    PostsController.deletePost(id, res);
  } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
    req.on("end", async () => {
      const id = req.url.split("/").pop();
      PostsController.editPost({ id, body, res });
    });
  } else if (req.method == "OPTIONS") {
    HttpController.cors(res);
  } else {
    HttpController.notFound(res);
  }
};

module.exports = routes;
