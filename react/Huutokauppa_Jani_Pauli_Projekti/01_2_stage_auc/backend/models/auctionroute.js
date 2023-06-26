const express = require("express")
const auceventModel = require("../models/aucevent")
const auction = require("../models/aucevent")

let router = express.Router()

router.get("/auctionevents", function(req,res){
    let query= {"user": req.session.user}
    if(req.query.type){
        query.type = req.query.type
    }

    auceventModel.find(query)
    .then(function(auctions){
        return res.status(200).json(auctions)
    })
    .catch(function(err){
        console.log(err)
        return res.status(500).json({"Message":"Internal server error"})
        })
    })

router.post("/auctionevents", function(req, res){
    if(!req.body){
        return res.status(400).json({"Message":"Bad request - check request TYPE "})
    }
    if(!body.type){
        return res.status(400).json({"Message":"Bad request - body type missing"})
    }

    let auction = new auceventModel({
        "auction_name" : req.body.auction_name,
        "auction_date_start": req.body.auction_date_start,
        "auction_date_end":req.body.auction_date_end,
        "auction_description": req.body.auction_description,
        "auction_address":req.body.auction_address,
        "auction_email":req.body.auction_email,
        "auction_phone":req.body.auction_phone
    })
    auction.save()
    .then(function(auction){
        return res.status(201).json(auction)
    })
    .catch(function(err){
        console.log(err)
        return res.status(500).json({"Message":"Internal server error fron save auction"})
    })

})





module.exports = router