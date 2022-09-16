const mongoose = require("mongoose");


const reservationSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    reservationDate: {type: Date, required: true},
    reservationTime: {type: String, required: true},
    numPersons: {type: Number, required: true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    
},{timestamps: true}
);
 
const Reservation  = mongoose.model("Reservation", reservationSchema);

 module.exports = Reservation; 

