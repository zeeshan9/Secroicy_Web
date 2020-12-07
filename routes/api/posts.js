const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const firebase = require("../../config/firebase");
const auth = require("../../middleware/auth");

// @route   Post /api/posts/addPostDetails
// @desc    Add post details
// @access  Private
router.post(
  "/addPostDetails",
  [
    auth,
    check("mobile", "mobile is required").not().isEmpty(),
    check("technology", "technology is required").not().isEmpty(),
    check("imei", "imei is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const noimg = "gigpic.png";
console.log(req.body);
    const { userId, mobile, technology, imei, description, time, name } = req.body;

    const post = await firebase
      .firestore()
      .collection("posts")
      .add({
        userId,
        mobile,
        technology,
        imei,
        description,
        time,
        name,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/secroicy-b5ba8.appspot.com/o/${noimg}?alt=media`,
      })
      .then((data) => {
      });
  
    res.json(post);
  }
);

// @route   get /api/posts/getallposts
// @desc    get all posts
// @access  Private
router.get("/getallposts", auth, async (req, res) => {
  const postCollection = await firebase.firestore().collection("posts").orderBy("time").get();

  const posts = [];

  postCollection.forEach((post) => {
    posts.push({
      id: post.id,
      mobile: post.data().mobile,
      technology: post.data().technology,
      imei: post.data().imei,
      imageUrl: post.data().imageUrl,
      description: post.data().description,
      userId: post.data().userId,
      time: post.data().time,
      name: post.data().name,
    });
  });
  
  res.json(posts.reverse());
});

// @route   GET /api/posts/search/:description
// @desc    Search for a particular post by imie
// @access  Private
router.get("/search/:description", auth, async (req, res) => {
  const description = req.params.description;
  try {

    const postCollection = await firebase.firestore().collection("posts").get();
    const posts = [];

    postCollection.forEach((post) => {
      if (post.data().imei === description) {
        posts.push({
          id: post.id,
          mobile: post.data().mobile,
          technology: post.data().technology,
          imei: post.data().imei,
          description: post.data().description,
          userId: post.data().userId,
        });
      }
    });

    res.send(posts);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// @route   PUT /api/posts/post-image/upload
// @desc    Upload post image
// @access  Private
router.put("/post-image/upload/:id", auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const path = require("path");
  const os = require("os");
  const imageToBeUploaded = {};
  const file = req.files.file;
  const fileExtension = file.mimetype.split("/")[1];
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/secroicy-b5ba8.appspot.com/o/${file.name}?alt=media`;

  // const filepath = path.join(os.tmpdir(), file.name.toString());
  const filepath = path.join(
    "C:\\Users\\qasim\\OneDrive\\Pictures\\",
    file.name.toString()
  );

  var storageref = firebase.storage().bucket();
  const metadata = {
    contentType: file.mimetype,
  };
  storageref
    .upload(filepath)
    .then((snapshot) => {})
    .then(() => {
      return firebase
        .firestore()
        .collection("posts")
        .doc(req.params.id)
        .update({ imageUrl, createdAt: new Date().toISOString() });
    })
    .then(() => {
      return res.json({ message: "image uploaded successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "something went wrong" });
    });

    
});
var nodemailer = require("nodemailer");
const creds = require("../../utils/emailcreds");

//sending email
router.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  //sending emailcreds
  var transport = {
    host: "smtp.gmail.com",
    auth: {
      user: creds.USER,
      pass: creds.PASS,
    },
  };

  var transporter = nodemailer.createTransport(transport);

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take messages");
    }
  });
  // email info
  var mail = {
    from: name,
    to: email, //Change to email address that you want to receive messages on
    subject: "New Message from nodemailer",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail",
        error: err,
      });
    } else {
      res.json({
        msg: "success",
      });
    }
  });
});

// @route   Put /api/posts/postMessage
// @desc    send message
// @access  Private
router.put(
  "/postMessage/:id",
  [auth, check("message", "message is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, userId, mobile, description, loginId, time, name } = req.body;

    // const { postid } = req.params.id;
    // console.log("object+ " + req.params.id);
    const post = await firebase.firestore().collection("messages").add({
      message,
      userId,
      postid: req.params.id,
      mobile,
      description,
      loginId,
      time,
      name
    });

    res.json("success" + post);
  }
);

// @route   Get /api/posts/getallmessages
// @desc    get post messages
// @access  Private
router.get("/getallmessages/:id", [auth], async (req, res) => {
  const messages = [];
  const message = await firebase
    .firestore()
    .collection("messages").orderBy("time")
    // .where("userId", "==", req.params.id)
    .get()
    .then((snapshot) => {
      snapshot.forEach((message) => {
        messages.push({
          message: message.data().message,
          userId: message.data().userId,
          postId: message.data().postid,
          loginId: message.data().loginId,
          mobile: message.data().mobile,
          technology: message.data().technology,
          description: message.data().description,
          time: message.data().time,
          name: message.data().name,
        });
      });
    });

  res.json(messages.reverse());
});

// @route   get /api/posts/getallposts
// @desc    get user posts
// @access  Private
router.get("/getuserposts/:id", auth, async (req, res) => {
  const postCollection = await firebase.firestore().collection("posts").get();

  const posts = [];

  postCollection.forEach((post) => {
    posts.push({
      id: post.id,
      mobile: post.data().mobile,
      technology: post.data().technology,
      imei: post.data().imei,
      imageUrl: post.data().imageUrl,
      description: post.data().description,
      userId: post.data().userId,
    });
    // }
  });
  res.json(posts);
});

module.exports = router;
