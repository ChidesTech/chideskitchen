const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Reservation = require("../models/reservationModel");
const { isAuth, isAdmin } = require("../utils");


const reservationRoute = express.Router();

reservationRoute.get(
  '/',
  isAuth,isAdmin,
  expressAsyncHandler(async (req, res) => {
    let reservations = await Reservation.find({}).populate("user", "name");
    res.send(reservations);
  })
);
reservationRoute.post("/", isAuth, expressAsyncHandler(async(req, res)=>{
   
        const reservation = new Reservation({
            fullName : req.body.fullName,
            reservationDate : req.body.date,
            reservationTime : req.body.time,
            numPersons : req.body.numPersons,
            user : req.user._id
        })
        const createdReservation = await reservation.save();
        res.status(201).send({message: "Reservation Successfully Created", reservation: createdReservation})
    
  }))
  reservationRoute.delete(
    '/:id',
    isAuth,isAdmin,
    expressAsyncHandler(async (req, res) => {
      const reservation = await Reservation.findById(req.params.id);
      if (reservation) {
        const deletedReservation = await reservation.deleteOne();
        res.send({message : "Reservation Successfully Deleted", reservation: deletedReservation});
      } else {
        res.status(404).send({ message: 'Reservation Not Found' });
      }
    })
  );

module.exports = reservationRoute;
  