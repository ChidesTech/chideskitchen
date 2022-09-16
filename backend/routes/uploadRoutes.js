// const multer = require('multer');
const express = require('express');
// const { isAuth } = require('../utils.js');
const {cloudinary} = require("../cloudinary.js")


const uploadRoute = express.Router();

// MULTER

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRoute.post('/', isAuth, upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

uploadRoute.post('/cloud', async(req, res) => {
  try {
    const fileStr = req.body.data;
   
      const uploadedResponse = await cloudinary.uploader.
      upload(fileStr, {
        upload_preset : "chidespencils"
      });
      res.send(uploadedResponse.url)
    
   
  } catch (error) {
     console.log(error);
     res.status(500).send({message: "Something went wrong"});
  }
});


module.exports = uploadRoute;
