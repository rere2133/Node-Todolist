const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "尚未填寫貼文內容"],
    },
    image: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
