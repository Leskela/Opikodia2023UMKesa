const express = require("express");
const mongoose =require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("../models/user");
const sessionModel = require("../models/session");

//MIDDLEWARES
const time_to_live_diff = 3600000

// let app = express()
// app.use(express.json())
let router = express.Router()

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	sessionModel.findOne({"token":req.headers.token}).then(function(session) {
		if(!session) {
			return res.status(403).json({"Message":"Forbidden"});
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"});
			}).catch(function(err) {
				console.log(err);
				return res.status(403).json({"Message":"Forbidden"});
			})
		} else {
			session.ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function() {
				return next();
			}).catch(function(err) {
				console.log(err);
				return next();
			})
		}
	}).catch(function(err) {
		console.log(err);
		return res.status(403).json({"Message":"Forbidden"});
	});
}

//LOGIN API

router.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"});
		}
		let user = new userModel({
			"username":req.body.username,
			"password":hash
		})
		user.save().then(function(user) {
			return res.status(200).json({"Message":"Register success"});
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username is already in use"});
			}
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"});
		});
	})
})

router.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"Message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log(err);
				return res.status(500).json({"Message":"Internal Server Error"});
			}
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"}); 
			}
			let token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				"user":req.body.username,
				"ttl":now+time_to_live_diff,
				"token":token
			})
			session.save().then(function(session) {
				return res.status(200).json({"token":token})
			}).catch(function(err) {
				console.log(err);
				return res.status(500).json({"Message":"Internal Server Error"});
			})
		})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({"Message":"Not found"});
	}
	sessionModel.deleteOne({"token":req.headers.token}).then(function() {
		return res.status(200).json({"Message":"Logged out"});
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
});

router.use("/api",isUserLogged)

module.exports = router;