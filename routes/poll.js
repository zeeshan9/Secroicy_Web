const express = require("express");
const router = express.Router();

const Pusher = require("pusher");

var pusher = new Pusher({
  app_id: "1025470",
  key: "8fcea27a86c3e8e27515",
  secret: "43d55bffb956c84b2ebe",
  cluster: "mt1",
  encrypted: true,
});

router.get("/", (req, res) => {
  req.send("Poll");
});

router.get("/getdata", (req, res) => {
  pusher.trigger("my-channel", "my-event-1", "my-channel");
  return res.json("success");
});

module.exports = router;
