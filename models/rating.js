const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackRatingSchema = new Schema({
  trackID:{
    type: String,
    required: true
  },
  avgRating:{
    type: String,
    required: true
  },
  count:{
    type: Number,
    required: true
  }
});

module.exports= mongoose.model('rating', trackRatingSchema);  