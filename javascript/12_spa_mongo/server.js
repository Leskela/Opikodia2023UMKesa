const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("./models/contact");

let app = express();

app.use(express.json());

app.use("/",express.static("public"));

let port = process.env.PORT || 3000;

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/contactdatabase?retryWrites=true&w=majority";

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
)

app.get("/api/contact",function(req,res) {
	contactModel.find().then(function(contacts) {
		return res.status(200).json(contacts)
	}).catch(function(err) {
		console.log("Database returned an error.",err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

app.post("/api/contact",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.firstname) {
		return res.status(400).json({"Message":"Bad request"});
	}
	let contact = new contactModel({
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"phone":req.body.phone
	})
	contact.save().then(function(contact) {
		return res.status(201).json(contact);
	}).catch(function(err) {
		console.log("Database returned an error.",err);
		return res.status(500).json({"Message":"Internal server error"})		
	})
})

app.delete("/api/contact/:id",function(req,res) {
	contactModel.deleteOne({"_id":req.params.id}).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log("Database returned an error.",err);
		return res.status(500).json({"Message":"Internal server error"})			
	})
})


app.put("/api/contact/:id", function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.firstname) {
		return res.status(400).json({"Message":"Bad request"});
	}
	let contact = {
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"phone":req.body.phone
	}
	contactModel.replaceOne({"_id":req.params.id},contact).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log("Database returned an error.",err);
		return res.status(500).json({"Message":"Internal server error"})		
	})
})
app.listen(port);

console.log("Running in port",port);