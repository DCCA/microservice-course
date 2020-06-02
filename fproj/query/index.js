const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
//

const handleEvent = (type, data) => {
  if (type === "postCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "commentCreated") {
    console.log(data);
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({
      id,
      content,
      status,
    });
  }

  if (type === "commentUpdated") {
    const { id, content, postId, status } = data;
    console.log(data);

    const post = posts[postId];
    console.log(post);

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;

    console.log("comment" + comment);
  }
};

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/events", (req, res, next) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("QueryService listening on 4002");
  console.log("Sync");
  const res = await axios
    .get("http://localhost:4005/events")
    .catch((err) => console.log(err));
  console.log(res.data);

  for (let event of res.data) {
    console.log("Processing event", event.type);

    handleEvent(event.type, event.data);
  }
});
