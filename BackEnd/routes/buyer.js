var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

//GET BUYER PROFILE DETAILS
router.get('/', function(req, res) {
      let request = {
         body: req.query,
         message: 'GETPROFILEBUYER'
      }
      kafka.make_request('buyer', request , res);
});

//UPDATE BUYER PROFILE
router.put('/', (req, res, next) => {
    let request = {
        body: req.body,
        message: 'UPDATEBUYERPROFILE'
    }
    kafka.make_request('buyer', request , res);
});



module.exports = router;
