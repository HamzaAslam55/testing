const express = require('express');
const router = express.Router();
// Load User model
const trackRating = require('../../models/trackRating');

//
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


router.post('/ratetrack', (req, res) => {
trackRating.findOne({ trackID: req.body.trackID })
.then(trackID => {
  if(trackID) {
    total = avgRating + req.body.avgRating;
    ucount = count + 1;
    newAvgRating = total / ucount;

    trackRating.findOneAndUpdate(
      {avgRating: newAvgRating},
      {count: ucount}
    )
    res.json({ msg: 'Updated' });
  }
  else{
    const Rating = new trackRating({
      trackID: req.body.trackID,
      avgRating: req.body.avgRating,
      count: 1
    });
    Rating.save(function(error){
      console.log("Rating Successful");
      if(error){
        console.log(error);
      }
    });
    res.json({ msg: 'Rated Successfully' });
  }
});
});
module.exports = router;

