const express = require("express");
const router = express.Router();

const Pusher = require("pusher");
const PushNotifications = require("@pusher/push-notifications-server");
const firebase = require("../config/firebase");
const { check, validationResult } = require("express-validator");

// @route   PUT /api/posts/post-image/upload
// @desc    Upload post image
// @access  Private
router.post("/uploadimage", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const path = require("path");
  const os = require("os");
  const imageToBeUploaded = {};

  console.log("file came here =>");
  // console.log(req.body.image.name);
  console.log(req.body);

  const file = req.body.image;
  const fileExtension = file.mimetype.split("/")[1];
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/secroicy-27f10.appspot.com/o/${file.name}?alt=media`;

  // const filepath = path.join(os.tmpdir(), file.name.toString());
  // const filepath = path.join(
  //   "C:\\Users\\zeesh\\OneDrive\\Pictures\\",
  //   file.name.toString()
  // );

  var storageref = firebase.storage().bucket();
  const metadata = {
    contentType: file.mimetype,
  };
  storageref
    .upload(req.files.file)
    .then((snapshot) => {})
    .then(() => {
      return firebase
        .firestore()
        .collection("mobilelocation")
        .add({ imageUrl, createdAt: new Date().toISOString() });
    })
    .then(() => {
      return res.json({
        message: `image uploaded successfully ${req.files.file.name}`,
      });
    })
    .catch((err) => {
      console.error(err);
      console.error(req.files.file);
      console.error(req.files.file.name);
      return res.status(500).json({ error: req.files.file });
    });
});

router.get("/:email", (req, res) => {

  const email = req.params.email;
  console.log(email, " email;;" )
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
  console.log("sent to android push notification (poll.file)");
  res.json({ msg: `Message sent to android ${email}` });
});

router.get("/getdata", (req, res) => {
  pusher.trigger("my-channel", "my-event-1", "my-channel");
  return res.json("success");
});

module.exports = router;
