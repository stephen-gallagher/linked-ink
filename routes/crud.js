const express = require("express")
const router = express.Router();


const User = require("../models/User")

const fileUploader = require("../config/cloudinary");

router.post("/upload", fileUploader.single("profilePicture"), (req, res, next) => {
    // console.log('file is: ', req.file)
  
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
    res.json({ secure_url: req.file.path });
  });

  module.exports = router;