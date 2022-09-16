const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const Product = require("../models/productModel");
const { isAuth, isAdmin } = require("../utils.js");

const productRoute = express.Router();

productRoute.get("/",expressAsyncHandler(async(req, res)=>{
  const pageSize = 30;
  const page = Number(req.query.pageNumber)|| 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' }} : {};
    const categoryFilter = category ? { category} : {};
    const count = await Product.countDocuments({ ...nameFilter, ...categoryFilter})
    const products = await Product.find({ ...nameFilter, ...categoryFilter})
    .skip(pageSize * (page-1)).limit(pageSize);
    res.send( {products, page, pages: Math.ceil(count/pageSize) })
}))

productRoute.get("/categories",expressAsyncHandler(async(req, res)=>{
    const categories = await Product.find({}).distinct("category");
    res.send( categories)
}))

productRoute.get("/seed",expressAsyncHandler(async(req, res)=>{
    await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts})
}))

productRoute.get("/:id",expressAsyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product)

    }else{
        res.status(404).send({message: "Product wasn't found"})
    }
}))

productRoute.post("/", isAuth,isAdmin, expressAsyncHandler(async(req, res)=>{
   const product = new Product({
       name: req.body.name,
       image: req.body.image || "/images/logo512.jpg",
       price: req.body.price,
       category:req.body.category,
       countInStock:0,
       rating:0,
       numReviews:0,
       description:req.body.description
   });
   const createdProduct = await product.save();
   res.send({message:"Product Created Successfull", product: createdProduct})

}))

productRoute.put("/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.description = req.body.description;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
      res.send({message: "Product was updated successfully",product : updatedProduct})

    }else{
        res.status(404).send({message: "Product wasn't found."})
    }

}))

productRoute.delete("/:id", isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
   if(product){
        const deletedProduct = await product.deleteOne();
      res.send({message: "Product was deleted successfully", product: deletedProduct})

    }else{
        res.status(404).send({message: "Product wasn't found."})
    }
    

}))

productRoute.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        if (product.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: 'You already submitted a review' });
        }
        const review = {
          name: req.body.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
          message: 'Review Created',
          review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

module.exports = productRoute;