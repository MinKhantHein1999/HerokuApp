const mongoose = require("mongoose");

const listingSchemas = new mongoose.Schema({
  profile_url : String,
  title: String,
  price: String,
  locality: String,
  details: String,
});

module.exports = mongoose.model("Listing", listingSchemas);
