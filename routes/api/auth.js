const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../../middleware/auth");
const firebase = require("../../config/firebase");

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    let user = await firebase.auth().getUser(req.user.id);

    const imageUrl = await (
      await firebase.firestore().collection("users").doc(user.uid).get()
    ).data().imageUrl;
    user = { ...user, imageUrl };

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// @route   GET /api/auth/loaduserprofile
// @desc    Get current logged in user
// @access  Private
router.get("/loaduserprofile", auth, async (req, res) => {
  try {
    let user = await firebase.auth().getUser(req.user.id);

    const userinfo = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((data) => {
        let userdata = {
          id: data.id,
          mobilelost: data.data().mobilelost,
          contactinfo: data.data().contactinfo,
          address: data.data().address,
          description: data.data().description,
          createdAt: data.data().createdAt,
          imageUrl: data.data().imageUrl,
          name: data.data().name,
          email: user.email,
        };

        return res.json(userdata);
      });

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// @route   POST /api/auth
// @desc    Login user
// @access  Public
router.post(
  "/",
  [
    check("email", "Email is required and must be valid").isEmail(),
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

    const { email, password } = req.body;

    try {
      console.log(email, "==", password);
      const user = await firebase.auth().getUserByEmail(email);

      const hashedPassword = await (
        await firebase.firestore().collection("users").doc(user.uid).get()
      ).data().password;

      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentails" });
      }

      const payload = {
        user: {
          id: user.uid,
        },
      };
      console.log("req from android " + user.uid);
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

module.exports = router;
