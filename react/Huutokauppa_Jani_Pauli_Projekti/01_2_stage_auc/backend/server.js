const express = require("express")
const mongoose =require("mongoose")
const auceventModel = require("./models/aucevent")

let app = express()

app.use(express.json())
app.use("/", express.static("public"))

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

let port = process.env.PORT || 3001

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/HuutokauppaDatabase?retryWrites=true&w=majority";

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
)
app.get("/api/aucevents", function (req, res) {
    auceventModel
      .find()
      .then(function (auctions) {
        return res.status(200).json(auctions);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).json({ Message: "Internal server error" });
      });
  });

app.post("/api/aucevents", function(req, res){
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

app.delete("/api/aucevents/:id", function(req, res){
auceventModel.deleteOne({"_id":req.params.id})
.then(function(stats){
  console.log(stats)
  return res.status(200).json({"Message":"Success"})
})
.catch(function(err){
  return res.status(500).json({"Message":"Internal server error"})
})
})


app.put("/api/aucevents/:id",function(req,res){
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




app.listen(port);
console.log("Pelailee portissa: ",port);