var express = require('express');
var router = express.Router();
var BuyerModel = require('./../models/buyer');
var SellerModel = require('./../models/seller');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');

router.get('/', function(req, res, next) {
  res.send('Welcome to GrubHub API layer');
});


router.post('/login', function(req, res, next) {
  console.log(req.body)
    let model = BuyerModel;
    if(req.body.option === '2') {
      model = SellerModel;
    }
    var query  = model.where({ email: req.body.email });
    query.findOne(function (err, result) {
      
      if (err) {
          res.send({
                 success: false,
                 msg: "Something went wrong",
                 msgDesc: err
          })
      }
      if (result) {
           bcrypt.compare(req.body.password, result.password).then((match) => {
              if(match) {
                let user = {
                    id: result._id,
                    email : result.email,
                    password: result.password,
                    role: req.body.option == '1' ? 'Buyer' : 'Seller'
                }
                jwt.sign(user, "Passphrase for encryption should be 45-50 char long", { expiresIn: 36000 },
                      (err, token) => {
                        if (err) {
                            res.status(500).send({
                              success: false,
                              msg: "JWT token signing error",
                              msgDesc: err
                            })
                        } else {
                            let obj = Object.assign({}, result._doc);
                            obj['password'] = req.body.password;
                            obj['token'] = token;
                            console.log(result);
                            res.send({
                              success: true,
                              msg: "Successfully logged in",
                              msgDesc: obj
                            })
                        }
                });  
              } else {
                res.send({
                  success: false,
                  msg: "Incorrect password. Try again!",
                  msgDesc: null
                })
              }
          });
      } else {
        res.send({
          success: false,
          msg: "Couldn't find any user with the entered Email",
          msgDesc: null
        })
      }
    });
});


router.post('/register-seller', function(req, res, next) {
    let request = {
      body: req.body,
      message: 'REGISTERSELLER'
    }
    kafka.make_request('seller', request , res);
})

router.post('/register-buyer', function(req, res, next) {
    let request = {
      body: req.body,
      message: 'REGISTERBUYER'
    }
    kafka.make_request('buyer', request , res);
})


module.exports = router;
