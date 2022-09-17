const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
const reservationRoute = require("./routes/reservationRoutes");
const dotenv = require("dotenv");
const uploadRoute = require("./routes/uploadRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const cors = require("cors");
const expressAsyncHandler = require("express-async-handler")


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true }));

// const MongoDBUri = "mongodb://localhost/chideStore";
 const MongoDBUri = "mongodb://chidestech:1Luvumum%2f@cluster0-shard-00-00.pzpph.mongodb.net:27017,cluster0-shard-00-01.pzpph.mongodb.net:27017,cluster0-shard-00-02.pzpph.mongodb.net:27017/kenac-sports?ssl=true&replicaSet=atlas-sg448v-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(MongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(result => {
      console.log("MongoDB is connected")
   }).catch(err => console.log(err))
  
//ROUTES SETUP
 app.use("/api/uploads", uploadRoute );
 app.use("/api/categories", categoryRoute );
 app.use("/api/reservations", reservationRoute );
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/config/paypal", (req, res)=>{
    res.send( /* PAYPAL SECRET */)
});

const __dirnames = path.resolve();
app.use('/uploads', express.static(path.join(__dirnames, '/uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });

  

app.get("/", (req, res)=>{
    res.send("Server Is Ready")
});

app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
})
app.listen(process.env.PORT || 5000, ()=> console.log("Listening on port 5000 at http://www.localhost:5000"));
