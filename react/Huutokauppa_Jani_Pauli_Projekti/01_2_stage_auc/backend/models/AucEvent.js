const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  auction_name: String,
  auction_description: String,
  auction_address: String,
  auction_email: String,
  auction_phone: String,
  auction_date_start: Date,
  auction_date_end: Date 
})

module.exports = mongoose.model("aucevents", Schema)