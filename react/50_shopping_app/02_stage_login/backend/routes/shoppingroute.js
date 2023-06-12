const express = require("express");
const itemModel = require("../models/item");

let router = express.Router();

router.get("/shopping", function(req,res) {
	let query = {"user":req.session.user}
	if(req.query.type) {
		query.type = req.query.type;
	}
	itemModel.find(query).then(function(items){
		return res.status(200).json(items);
	}).catch(function(err){
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

router.post("/shopping", function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let item = new itemModel({
		"user":req.session.user,
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price
	})
	item.save().then(function(item) {
		return res.status(201).json(item)
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function(stats) {
		console.log(stats);
		return res.status(200).json({"Message":"Success"});
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})		
	})
})


router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"user":req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item).then(function(stats) {
		console.log(stats);
		return res.status(200).json({"Message":"Success"});
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"});		
	})
})

module.exports = router;