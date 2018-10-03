const router = require('express').Router();
const async = require('async');
const Gig = require('../models/gig');
const User = require('../models/user');
const Doit = require('../models/Doit');
const Promocode = require('../models/promocode');



router.get('/', (req, res, next) => {

    Gig.find({}, function(err, gigs) {
      res.render('main/home', { gigs: gigs });
    })
});


router.get('/my-gigs', (req, res, next) => {
  Gig.find({ owner: req.user._id }, function(err, gigs) {
    
    res.render('main/my-gigs', { gigs: gigs }); 
  })
});

router.get('/notifications',(req,res,next)=>{
  Doit.find({userid:req.user._id,},function(err,doits){
    var doit = new Doit();  
    console.log(doits+'hahsahdahdasd');
    res.render('main/notifications',{doits:doits});
  })
})

router.get('/collab', (req, res, next) => {
 
  
  User.find({},(err,usr)=>{
  
    res.render('main/collab', {shit:usr}); 
  })
});
router.get('/users/collab-details/:id', (req, res, next) => {
 
  User.find({ _id: req.params.id }, function(err, user) {
    console.log(user);
    res.render('main/collab-details', { id: user }); 
 
  })
});
router.get('/delete-request/:id', (req, res, next) => {
Doit.deleteOne({_id:req.params.id}, function (err , result ) {
  console.log(result +" ok");
  res.render('main/notifications')
})

});

router.get('/accepting-request/:id', (req, res, next) => {
  console.log(req.params.id);
 Doit.find({ userid : req.params.id} , function (err, produ) {
   console.log(produ);
   
  console.log('pushed')
  res.render('main/accepting-request', { id: produ }); 
})
  });

 
  




router
  .post('/users/collab-details/:email',(req, res, next) => {
    async.waterfall([
      function(callback) {
      
        var doit = new Doit();  
        doit.userid=req.params.email;
        doit.title = req.body.doit_title;
        doit.category = req.body.doit_category;
        doit.about = req.body.doit_about;
        doit.info=req.body.doit_info;
        doit.save(function(err) {
          callback(err, doit);
        });
      },

      function(doit, callback) {
        
       /* var id=doit._id;
        console.log(doit._id);
        User.findByIdAndUpdate(id,{$push:{doits:doit}},function(err,doc){
          if(err)console.error(err)
          console.log('pushed')
        })*/
        User.update({
            _id: req.params.email
          },
            {   
              $push: { doits:doit._id }
          }, function(err, count) {
            res.redirect('/');
          }
        )
      }
    ]);
  });


router.route('/add-new-gig')
  .get((req, res, next) => {
    res.render('main/add-new-gig');
  })
  .post((req, res, next) => {
    async.waterfall([
      function(callback) {
        var gig = new Gig();
        gig.owner = req.user._id;
        gig.title = req.body.gig_title;
        gig.category = req.body.gig_category;
        gig.about = req.body.gig_about;
        gig.price = req.body.gig_price;
        gig.save(function(err) {
          callback(err, gig);
        });
      },

      function(gig, callback) {
        User.update(
          {
            _id: req.user._id
          },{
            $push: { gigs: gig._id }
          }, function(err, count) {
            res.redirect('/my-gigs');
          }
        )
      }
    ]);
  });

  router.get('/service_detail/:id',(req,res,next)=>{
    Gig.findOne({_id: req.params.id})
    .populate('owner')
    .exec(function(err,gig){
        res.render('main/service_detail',{gig:gig});
    });
  });

  router.get('/api/add-promocode', (req, res, next) => {
    var promocode = new Promocode();
    promocode.name = "instudio";
    promocode.discount = 0.4;
    promocode.save(function(err) {
      res.json("Successful");
    });
  });
        
  router.post('/promocode', (req, res, next) => {
    var promocode = req.body.promocode;
    var totalPrice = req.session.price;
    Promocode.findOne({ name: promocode }, function(err, foundCode) {
      if (foundCode) {
        var newPrice = foundCode.discount * totalPrice;
        newPrice = totalPrice - newPrice;
        req.session.price = newPrice;
        res.json(newPrice);
      } else {
        res.json(0);
      }
    });
  });




module.exports = router;
