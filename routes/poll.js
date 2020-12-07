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
    
   // Convert base64 to buffer
    const buffer = Buffer.from(encodedimage, "base64");

    const imagePath = path.resolve(__dirname, imageName);

    // Pipes an image with "hiddenImage.jpg" as the name. 
     fs.writeFileSync(imagePath, buffer);
    console.log(path.resolve(__dirname, imageName))
    var storageref = firebase.storage().bucket();
    

  storageref
    .upload(imagePath)
    .then((snapshot) => { })
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


    console.log("Image sent to firebase");
});

router.get("/getdata", (req, res) => {
  pusher.trigger("my-channel", "my-event-1", "my-channel");
  return res.json("success");
});


router.get("/Trigger/:email", (req, res) => {
  let beamsClient = new PushNotifications({
    instanceId: 'b17d4827-687e-4155-9507-b19b2d9e407a',
    secretKey: 'AECDAAB8DD365AC5CEB0A6CE25A60B56DE848C4CF4A05BE26841ABA471930F2D'
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


// ===========================
// @route   Post /getphoneNo
// @desc    Get current logged in user
// @access  Private
router.post("/getphoneno", async (req, res) => {
  try {
    console.log('poll/ testing');
    
    const user = await firebase.auth().getUserByEmail(req.body.email);
    
    const phoneNo = await (
      await firebase.firestore().collection("users").doc(user.uid).get()
      ).data().contactinfo;
      
      return res.json({ phoneNo})
   
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
//--------------------------------------





module.exports = router;
