const express = require("express");
const itemModel = require("../models/Item");

let router = express.Router();

console.log("###6 itemModel:",itemModel);

//Hakee tiedot!
router.get("/shopping", function(req,res) {
    itemModel.find().then(function(items){
        return res.status(200).json(items);
    }).catch(function(err){
        console.log("###12 err:",err);
        return res.status(500).json({"Message":"Internal server error"})
    })
})

//Uuudet tiedot
router.post("/shopping", function(req,res) {
    if(!req.body) {
        return res.status(400).json({"Message":"Bad Request"})
    }
    if(!req.body.type) {
        return res.status(400).json({"Message":"Bad Request"})
    }
    let item = new itemModel({
        // "type":req.body.type,
        // "count":req.body.count,
        // "price":req.body.price,
        "auction_name":req.body.auction_name,
        "auction_starttime":req.body.auction_starttime,
        "auction_endtime":req.body.auction_endtime
    })
    item.save().then(function(item) {
        return res.status(201).json(item)
    }).catch(function(err) {
        console.log(err);
        return res.status(500).json({"Message":"Internal server error"})
    })
})

//Poisto!
router.delete("/shopping/:id",function(req,res) {
    itemModel.deleteOne({"_id":req.params.id}).then(function() {
        return res.status(200).json({"Message":"Success"});
    }).catch(function(err) {
        console.log(err);
        return res.status(500).json({"Message":"Internal server erro"});
    })
})

//Edit!
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
        "auction_name":req.body.auction_name,
        "auction_starttime":req.body.auction_starttime,
        "auction_endtime":req.body.auction_endtime
	}
	itemModel.replaceOne({"_id":req.params.id},item).then(function(stats) {
		console.log(stats);
		return res.status(200).json({"Message":"Success"});
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"});		
	})
})

//Lähettää tiedot serverille!
module.exports = router;