const express = require("express");
const mongoose = require("mongoose");
const shoppingRoute = require("./routes/shoppingroutes");

let app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

let port = process.env.PORT || 3001

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/shoppingdatabase?retryWrites=true&w=majority";

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
)

app.use("/api",shoppingRoute);

app.listen(port);
console.log("Running in port",port);