const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res, next) => {
  const { type, data } = req.body;
  console.log(data);
  if (type === "commentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    console.log(status);

    await axios.post("http://event-bus-srv:4005/events", {
      type: "commentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("ModerationService listening on 4003");
});
