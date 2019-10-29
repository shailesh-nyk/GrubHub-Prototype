var express = require('express');
var router = express.Router();
var BuyerModel = require('../models/buyer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var kafka = require('../kafka/client');

//GET BUYER PROFILE DETAILS
router.get('/', function(req, res) {
      kafka.make_request('profile_buyer', req.query , function(err,result){
        console.log('in result');
        console.log(result);
        if (err){
            console.log("Inside err");
            res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
            })
        }else{
            console.log("Inside else");
            res.send({
              success: true,
              msg: "Successfully fetched the buyer profile" ,
              msgDesc: result
            }) 
        }
        
    });
 
});

//UPDATE BUYER PROFILE
router.put('/', (req, res, next) => {
   bcrypt.hash(req.body.password, saltRounds, (err, hash) => { 
      let user = {
        name: req.body.name,
        address:  req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        zipcode: req.body.zipcode
      }
      BuyerModel.update( { _id: req.body._id }, user , function(err, result){
        if(err) {
            res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            res.send({
                success: true,
                msg: "Successfully updated your user profile" ,
                msgDesc: user
            }) 
        }
      });
  });
});



module.exports = router;
