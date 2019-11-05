var BuyerModel = require('../models/buyer');
var SellerModel = require('../models/seller');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.getProfile = function(req, callback){
      BuyerModel.where({ _id: req.id }).findOne(function (err, result) {
      if (err) {
          callback(null, {
                  success: false,
                  msg: "Something went wrong",
                  msgDesc: err
          })
      }
      else if(result) {
          callback(null,{
              success: true,
              msg: "Successfully fetched the buyer profile" ,
              msgDesc: result
          }) 
      } 
      });
};

module.exports.updateBuyerProfile = function(req, callback) {
    bcrypt.hash(req.password, saltRounds, (err, hash) => { 
        let user = {
          name: req.name,
          address:  req.address,
          email: req.email,
          phone: req.phone,
          password: hash,
          zipcode: req.zipcode
        }
        BuyerModel.update( { _id: req._id }, user , function(err, result){
          if(err) {
              callback(null,{
                  success: false,
                  msg: "Something went wrong",
                  msgDesc: err
              })
          } else {
              callback(null,{
                  success: true,
                  msg: "Successfully updated your user profile" ,
                  msgDesc: user
              }) 
          }
        });
    });
}

module.exports.registerBuyer = function(req, callback) {
    let newUser = new SellerModel({
        name: req.name,
        email: req.email,
        password: req.password,
        address: req.rest_address,
        zipcode: req.rest_zipcode,
        phone: req.phone,
        rest_name: req.rest_name,
        cuisine: req.cuisine.toLowerCase(),
    })
    newUser.save(function (err, resp) {
    if(err) {
        callback(null,{
            success: false,
            msg: err.message,
            msgDesc: err
        })
    } else{
        callback(null,{
            success: true,
            msg: "Registered you successfully! Your journey to success has begun!",
            msgDesc: resp
        }) 
    }
    }); 
}

module.exports.search = function(req, callback) {
    let search = {
        $or: [
          { "items.name" : { "$regex": req.searchKey, "$options": "i" } },
          { rest_name : { "$regex": req.searchKey, "$options": "i" } }
        ]
      }
      SellerModel.find(search, function(err, result) {
          if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                content: err
            })
          } else {
            callback(null,{
                success: true,
                msg: "Got search results" ,
                content: result
            }) 
          }
      })
}

module.exports.getCuisineList = function(req, callback) {
    SellerModel.find().distinct("cuisine", function(err, results) {
        if(err) {
          callback(null,{
            success: false,
            msg: "Something went wrong",
            content: err
        })
    } else {
        callback(null,{
            success: true,
            msg: "Got cuisine list" ,
            content: results
        }) 
    } 
    }); 
}