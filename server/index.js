const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoute = require("./routes/payments.js");

//Initialize App
const app = express();

// Setting up enivronment variables
dotenv.config();

//Middlewares
app.use(express.json());
app.use(cors()); 

//Routing
app.use("/api/payment/",paymentRoute);

//Listening App
const port = process.env.PORT || 8080;
app.listen(port,()=> console.log(`Listening port ${port}`));


