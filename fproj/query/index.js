const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
//

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/events", (req, res, next) => {
  const { type, data } = req.body;

  if (type === "postCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "commentCreated") {
    const { commentId, content, postId } = data;

    const post = posts[postId];
    post.comments.push({
      commentId,
      content,
    });
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("QueryService listening on 4002");
});
