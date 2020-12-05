const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const firebase = require("../../config/firebase");
const auth = require("../../middleware/auth");

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required and must be valid").isEmail(),
    check("mobilelost", "Mobile is required").not().isEmpty(),
    check("contactinfo", "Technology is required").not().isEmpty(),
    check("address", "Location is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check(
      "password",
      "Password is required and must be atleast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const noimg = "mo-image.png";
    const {
      name,
      email,
      password,
      mobilelost,
      contactinfo,
      address,
      description,
    } = req.body;

    try {
      const user = await firebase.auth().createUser({
        displayName: name,
        email,
      });

      const salt = await bcrypt.genSalt(10);

      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          name,
          password: await bcrypt.hash(password, salt),
          createdAt: new Date().toISOString(),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/secroicy-b5ba8.appspot.com/o/${noimg}?alt=media`,
          mobilelost,
          contactinfo,
          address,
          description,
        });
      console.log("userregistered");
      const payload = {
        user: {
          id: user.uid,
        },
      };

      jwt.sign(
        payload,
        "T8jBGxyeBCTm21ixS3Jx",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
);

// @route   PUT /api/users/profile-picture/upload
// @desc    Upload profile picture
// @access  Private
router.put("/profile-picture/upload", auth, async (req, res) => {
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
  // const task = storageref.child(file.name).put(file, metadata);

  
  console.log(filepath," second arg: " , imageUrl)
  storageref
    .upload(filepath)
    .then((snapshot) => {
      // return snapshot.ref.getDownloadURL();
      // console.log("Uploaded a  file!");
      //gs://secroicy-b5ba8.appspot.com/logan.jpg
    })
    .then(() => {
      return firebase
        .firestore()
        .collection("users")
        .doc(req.user.id)
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

// @route   PUT /api/users/addpost
// @desc    Add post details
// @access  Private
router.post(
  "/addPost",
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

    const { mobile, technology, imei, description } = req.body;

    firebase.firestore().collection("posts").add({
      mobile,
      technology,
      imei,
      description,
    });

    res.json("success");
  }
);

module.exports = router;
