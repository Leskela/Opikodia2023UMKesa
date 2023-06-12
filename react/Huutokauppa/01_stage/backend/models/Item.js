const mongoose = require("mongoose");

console.log("###3 Items.js")
let Schema = mongoose.Schema({
    // type:String,
    // count:Number,
    // price:Number,
    auction_name:String,
    auction_starttime:String,
    auction_endtime:String,
    auction_desription:String,
    auction_adress:String,
    auction_phone:String
})

module.exports = mongoose.model("Item",Schema);
