const mongoose = require("mongoose");

console.log("###3 Items.js")
let Schema = mongoose.Schema({
    type:String,
    count:Number,
    price:Number
})

module.exports = mongoose.model("Item",Schema);
