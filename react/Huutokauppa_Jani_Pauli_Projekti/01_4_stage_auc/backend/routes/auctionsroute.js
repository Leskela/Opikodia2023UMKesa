const express = require("express")
const auceventModel = require("../models/aucevent")
const aucevent = require("../models/aucevent")

let router = express.Router()




router.get("/aucevents", function (req, res) {

    auceventModel
      .find()
      .then(function (auctions) {
        return res.status(200).json(auctions);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).json({ Message: "Internal server error TÄSSÄ" });
      });
  });

router.post("/aucevents", function(req, res){
    if(!req.body){
        return res.status(400).json({"Message":"Bad request - check request TYPE "})
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

router.delete("/aucevents/:id", function(req, res){
auceventModel.deleteOne({"_id":req.params.id})
.then(function(stats){
  console.log(stats)
  return res.status(200).json({"Message":"Success"})
})
.catch(function(err){
  return res.status(500).json({"Message":"Internal server error"})
})
})

router.put("/aucevents/:id",function(req,res){
  if(!req.body){
    return res.status(400).json({"Message":"Bad request - body missing"})
  }


let auction = {
  "auction_name" : req.body.auction_name,
  "auction_date_start": req.body.auction_date_start,
  "auction_date_end":req.body.auction_date_end,
  "auction_description": req.body.auction_description,
  "auction_address":req.body.auction_address,
  "auction_email":req.body.auction_email,
  "auction_phone":req.body.auction_phone
}
auceventModel.replaceOne({"_id":req.params.id}, auction)
.then(function(stats){
  console.log(stats)
  return res.status(200).json({"Message":"Success"})
})
.catch(function(err){
  console.log(err)
  return req.status(500).json({"Message":"Internal server"})
})

})



module.exports = router