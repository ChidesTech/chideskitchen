const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");
const { isAuth, isAdmin } = require("../utils.js");

const categoryRoute = express.Router();



categoryRoute.get("/",expressAsyncHandler(async(req, res)=>{
    const categories = await Category.find({});
    res.send( categories )
}))

categoryRoute.get("/seed",expressAsyncHandler(async(req, res)=>{
    await Category.deleteMany({})
    const createdCategories = await Category.insertMany(data.categories);
    res.send({createdCategories})
}))

categoryRoute.get("/:id",expressAsyncHandler(async(req, res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        res.send(category)

    }else{
        res.status(404).send({message: "Category wasn't found"})
    }
}))

categoryRoute.post("/", isAuth,isAdmin, expressAsyncHandler(async(req, res)=>{
   const category = new Category({
       name:req.body.name,
       image:"images/egusi.jpg",
   });
   const createdCategory = await category.save();
   res.send({message:"Category Created Successfull", category: createdCategory})

}))

categoryRoute.put("/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if(category){
        category.name = req.body.name;
        category.image= req.body.image;
       
        const updatedCategory = await category.save();
      res.send({message: "Category was updated successfully",category : updatedCategory})

    }else{
        res.status(404).send({message: "Category wasn't found."})
    }

}))

categoryRoute.delete("/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
   if(category){
        const deleteCategory = await category.deleteOne();
      res.send({message: "Category was deleted successfully"})

    }else{
        res.status(404).send({message: " Category wasn't found.", category: deleteCategory})
    }
    

}))

module.exports = categoryRoute;