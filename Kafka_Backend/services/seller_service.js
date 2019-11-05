var SellerModel = require('../models/seller');

module.exports.getProfile = function(req, callback){
    SellerModel.where({ _id: req.id }).findOne(function (err, result) {
        if (err) {
            callback(null,{
                   success: false,
                   msg: "Something went wrong",
                   msgDesc: err
            })
        }
        else if(result) {
            callback(null,{
                success: true,
                msg: "Successfully fetched the seller profile" ,
                msgDesc: result
            }) 
        } 
    });
};

module.exports.registerSeller = function(req, callback) {
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

module.exports.updateSellerProfile = function(req, callback) {
    bcrypt.hash(req.password, saltRounds, (err, hash) => { 
        let user = {
          name: req.name,
          address:  req.address,
          email: req.email,
          phone: req.phone,
          password: hash,
          zipcode: req.zipcode,
          rest_name: req.rest_name,
          cuisine: req.cuisine.toLowerCase()
        }
        SellerModel.update( { _id: req.id }, user , function(err, result){
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