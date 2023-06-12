const express = require("express");

let app = express();

app.use(express.json());

app.use("/",express.static("public"));

app.post("/login",function(req,res) {
	console.log(req);
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	console.log("User",user);
	if(user.username === "admin" && user.password === "adminadmin") {
		return res.status(200).json({"message":"logged in"});
	} else {
		return res.status(401).json({"message":"unauthorized"});
	}
})

app.listen(3000);

console.log("Running in port 3000");