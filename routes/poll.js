const express = require("express");
const router = express.Router();

const Pusher = require("pusher");
const PushNotifications = require("@pusher/push-notifications-server");

router.get("/", (req, res) => {
  // var pusher = new Pusher({
  //   app_id: "1025470",
  //   key: "8fcea27a86c3e8e27515",
  //   secret: "43d55bffb956c84b2ebe",
  //   cluster: "mt1",
  //   encrypted: true,
  // });

  // pusher.trigger("my-channel", "my-event", {
  //   message: "hello world",
  // });

  let beamsClient = new PushNotifications({
    instanceId: "410ee95b-fffc-4c01-aaa5-d7760e0358cb",
    secretKey:
      "53BB2DA4F848423CE135F8F53BCEED7F379BE1F17D172CF17EB469EA2C4D4702",
  });

  beamsClient
    .publishToInterests(["hello"], {
      fcm: {
        notification: {
          title: "Hello",
          body: "Hello, world!",
        },
        priority: "high",
      },
    })
    .then((publishResponse) => {
      console.log("Just published:", publishResponse.publishId);
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  res.json({ msg: "Message sent to android" });
});

router.get("/getdata", (req, res) => {
  pusher.trigger("my-channel", "my-event-1", "my-channel");
  return res.json("success");
});

module.exports = router;
