const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Hamara banaya hua model

// 1. POST Route: User ki Profile save ya update karne ke liye (Eligibility Page se)
router.post('/profile', async (req, res) => {
  try {
    const { dob, qualification } = req.body;
    
    // Abhi authentication nahi hai, toh hum specific naam se check kar rahe hain
    let user = await User.findOne({ name: "Aman Pandey" });
    
    if (user) {
      user.dob = dob;
      user.qualification = qualification;
      await user.save();
    } else {
      user = new User({ name: "Aman Pandey", dob, qualification });
      await user.save();
    }
    
    res.status(200).json({ success: true, message: "Profile safely stored in Vault!", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Engine overload! Something went wrong." });
  }
});

// 2. GET Route: User ki Profile ka data dekhne ke liye
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne({ name: "Aman Pandey" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching profile." });
  }
});

module.exports = router;