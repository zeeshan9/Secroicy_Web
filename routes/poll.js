const express = require("express");
const router = express.Router();

const Pusher = require("pusher");
const PushNotifications = require("@pusher/push-notifications-server");
const firebase = require("../config/firebase");
const { check, validationResult } = require("express-validator");
const { CLIENT_RENEG_LIMIT } = require("tls");
const fs = require('fs');
const path = require("path");

// @route   Post /api/poll/uploadimage/
// @desc    Upload post image
// @access  Private
router.post("/uploaddata", async (req, res) => {

  const { email, longitude, latitude, time, encodedimage } = req.body;
  const imageName = "hiddenimage"+time+".png";
  
  console.log("file came here");
  
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/secroicy-b5ba8.appspot.com/o/${imageName}?alt=media`;
  
  console.log(req.body);
  
   // Convert base64 to buffer
    const buffer = Buffer.from(encodedimage, "base64");

    const imagePath = path.resolve(__dirname, imageName);

    // Pipes an image with "hiddenImage.jpg" as the name. 
     fs.writeFileSync(imagePath, buffer);
    console.log(path.resolve(__dirname, imageName))
    var storageref = firebase.storage().bucket();
    
    console.log("fsfile " + fs.__dirname);   
    console.log(buffer);

  storageref
    .upload(imagePath)
    .then((snapshot) => { console.log("snapsot "); console.log(snapshot)})
    .then(() => { 
      return firebase
        .firestore()
        .collection("mobilelocation")
        .add({ 
          email,
          longitude,
          latitude,
          time,
          imageUrl,
          createdAt: new Date().toISOString()
         });
    })
    .then(() => {
      return res.json({
        message: `image uploaded successfully ${fs}`,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: req });
    });
});


router.get("/getdata", (req, res) => {
  pusher.trigger("my-channel", "my-event-1", "my-channel");
  return res.json("success");
});


router.get("/Trigger/:email", (req, res) => {
  let beamsClient = new PushNotifications({
    instanceId: '410ee95b-fffc-4c01-aaa5-d7760e0358cb',
    secretKey: '53BB2DA4F848423CE135F8F53BCEED7F379BE1F17D172CF17EB469EA2C4D4702'
  });

  var channelName= 'debug-'+ req.params.email.trim().toLowerCase();
  console.log(channelName);
  beamsClient.publishToInterests([channelName], {
    fcm: {
      notification: {
        title: 'Hello',
        body: 'Hello, world!'
      }
    }
  }).then((publishResponse) => {
    console.log('Just published:', publishResponse.publishId);
  }).catch((error) => {
    console.error('Error:', error);
  });

  return res.json("success");
});

module.exports = router;
