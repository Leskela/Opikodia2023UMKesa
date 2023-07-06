const express = require("express")
const mongoose =require("mongoose")
const userLogRoute = require("./routes/userlogroute");
const auctionsRoute = require("./routes/auctionsroute");

// const auctionsRoute = require("./routes/auctionsroute");

// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// const userModel = require("./models/user");
// const sessionModel = require("./models/Session");

let app = express()
app.use(express.json())

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

let port = process.env.PORT || 3001

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/HuutokauppaDatabase?retryWrites=true&w=majority";
console.log(url)

mongoose.connect(url)
.then(
  ()=> console.log("Yhteys MongoDB-tietokantaan muodostettu // Connected to Mongo DB"),
  (error) => 
  console.log("Ei yhteyttä MongoDB-tietokantaan // No connection to Mongo DB", error)
)

app.use("/",userLogRoute)
app.use("/api",auctionsRoute)

app.listen(port);
console.log("Pelailee portissa: ",port);