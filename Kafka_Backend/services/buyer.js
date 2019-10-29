var BuyerModel = require('../models/buyer');

function handle_request(req, callback){
    console.log(req);
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

module.exports = handle_request;

