const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const { isAuth, isAdmin } = require("../utils");

const userRoute = express.Router();

userRoute.get("/seed",expressAsyncHandler(async(req, res)=>{
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers})
}));
userRoute.get("/createadmin",expressAsyncHandler(async(req, res)=>{
    const admin = new User({
         name: "Desmond",
         email: "dnwosu008@gmail.com",
         password: bcrypt.hashSync("desmond", 8),
         isAdmin: true,
         isSuper: true,

    
    });
    await admin.save();
    res.send(admin)

}));


userRoute.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );

  
  userRoute.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
      const email = await User.findOne({ email: req.body.email });
     if(!email){
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin :true
      });
      const createdUser = await user.save();
      if(createdUser){
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      })
      return;
    }
     }
      res.status(401).send({ message: 'The Email Has Already Been Used'});     
    })
  );

 

  userRoute.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

  

  userRoute.put("/profile",isAuth, expressAsyncHandler(async(req, res)=>{
   const user = await User.findById(req.user._id);
   if(user){
     user.name = req.body.name || user.name;
   }if(req.body.password){
     user.password = bcrypt.hashSync(req.body.password, 8);
   }
   const updatedUser = await user.save();
   res.send({
     _id: updatedUser._id,
     name: updatedUser.name,
     email: updatedUser.email,
     isAdmin: updatedUser.isAdmin,
     token: generateToken(updatedUser._id)
   })


  }));

  userRoute.get(
    '/',
    isAuth,isAdmin,
    expressAsyncHandler(async (req, res) => {
      let users = await User.find({});
      res.send(users);
    })
  );

  userRoute.delete(
    '/:id',
    isAuth,isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        const deletedUser = await user.deleteOne();
        res.send({message : "User Successfully Deleted", user: deletedUser});
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
  
  userRoute.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
       
        user.isSuper = Boolean(req.body.isSuper);
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.send({ message: 'User Updated Successfully', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

 
module.exports = userRoute;