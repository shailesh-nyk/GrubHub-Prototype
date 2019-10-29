var express = require('express');
var router = express.Router();
var SellerModel = require('../models/seller');


router.get('/', (req, res, next) => {
    let search = {
      $or: [
        { "items.name" : { "$regex": req.query.searchKey, "$options": "i" } },
        { rest_name : { "$regex": req.query.searchKey, "$options": "i" } }
      ]
    }
    SellerModel.find(search, function(err, result) {
        if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              content: err
          })
        } else {
          res.send({
              success: true,
              msg: "Got search results" ,
              content: result
          }) 
        }
    })
});

router.get('/cuisine', (req, res, next) => {  
  SellerModel.find().distinct("cuisine", function(err, results) {
        if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              content: err
          })
       } else {
            res.send({
              success: true,
              msg: "Got cuisine list" ,
              content: results
          }) 
      } 
  });
});


module.exports = router;
