const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const firebase = require("../../config/firebase");
const auth = require("../../middleware/auth");

// @route   Post /location
// @desc    Add Cell Phone details
// @access  Public
router.post(
  "/",
  [
    check("email", "email is required").not().isEmpty(),
    check("longitude", "Longitude is required").not().isEmpty(),
    check("latitude", "Latitude is required").not().isEmpty(),
    check("time", "Time is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, longitude, latitude, time, imageUrl } = req.body;

    const location = await firebase
      .firestore()
      .collection("mobilelocation")
      .add({
        email,
        longitude,
        latitude,
        time,
        imageUrl
      })
      .then((data) => {
        console.log("cell phone data here");
        console.log(email, longitude, latitude, time, imageUrl);
      });

    res.json( location);
  }
);

  // @route   Get /location
  // @desc    get Cell Phone details
  // @access  public
  router.get("/:email", async (req, res) => {
    const email = req.params.email;
    console.log("Email=" +email)
    try {
  
      const trackCellPhone = await firebase.firestore().collection("mobilelocation").orderBy("time").get();
      const locations = [];
      // Find user cell Phone base on email
      trackCellPhone.forEach((location) => {
        console.log(location.data().email,' <= location api check => ' , email);
        
        if (location.data().email === email) { 
          locations.push({
            latitude: location.data().latitude,
            longitude: location.data().longitude,
            time: location.data().created,
            email: location.data().email,
            imageUrl: location.data().imageUrl,
          });
        }
      });
  
      res.send(locations);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  });

  
  module.exports = router;