const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { isAuth, isAdmin } = require("../utils");

const orderRoute = express.Router();
orderRoute.get(
  '/',
  isAuth,isAdmin,
  expressAsyncHandler(async (req, res) => {
    let orders = await Order.find({}).populate("user", "name");
    res.send(orders);
  })
);
orderRoute.get(
  '/personal',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRoute.post("/", isAuth, expressAsyncHandler(async(req, res)=>{
  if(req.body.orderItems.length === 0){
      res.status(400).send({message : "Your Cart Is Empty"})
  }else{
      const order = new Order({
          orderItems : req.body.orderItems,
          deliveryInfo : req.body.deliveryInfo,
          paymentMethod : req.body.paymentMethod,
          itemsPrice : req.body.itemsPrice,
          deliveryCost : req.body.deliveryCost,
          taxPrice : req.body.taxPrice,
          totalPrice : req.body.totalPrice,
          user : req.user._id
      })
      const createdOrder = await order.save();
      res.status(201).send({message: "New Order Created", order: createdOrder})
  }
}))



orderRoute.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRoute.put("/:id/pay", isAuth, expressAsyncHandler( async(req, res)=>{
     const order = await Order.findById(req.params.id);
     if(order){
         order.isPaid = true;
         order.paidAt = Date.now();
         order.paymentResult = {
             id: req.body.id,
             status: req.body.status,
             update_time: req.body.update_time,
             email_address : req.body.email_address
         };
         const updatedOrder = await order.save();
         res.send({message: "Paid Successfully", order: updatedOrder})
     }else {
        res.status(404).send({ message: 'Order Not Found' });
      }
  }))

  orderRoute.delete(
    '/:id',
    isAuth,isAdmin,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        const deletedOrder = await order.deleteOne();
        res.send({message : "Order Successfully Deleted", order: deletedOrder});
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRoute.put("/:id/deliver", isAuth, expressAsyncHandler( async(req, res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.delivered = Date.now();
        
        const updatedOrder = await order.save();
        res.send({message: "Delivered Successfully", order: updatedOrder})
    }else {
       res.status(404).send({ message: 'Order Not Found' });
     }
 }))
module.exports = orderRoute;