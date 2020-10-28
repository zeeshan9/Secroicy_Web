const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const firebase = require("../../config/firebase");
const auth = require("../../middleware/auth");


  router.get("/:id", async (req, res) => {
    const email = req.params.email;
    try {
  
      const trackCellPhone = await firebase.firestore().collection("mobilelocation").get();
      const locations = [];
      // Find user cell Phone base on email
      trackCellPhone.forEach((location) => {
        if (location.data().email === email) {
          locations.push({
            latitude: location.data().latitude,
            longitude: location.data().longitude,
            time: location.data().time,
            email: location.data().email,
          });
        }
      });
  
      res.send(locations);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  });
  module.exports = router;