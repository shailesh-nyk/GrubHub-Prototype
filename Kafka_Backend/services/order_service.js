var SellerModel = require('../models/seller');
var BuyerModel = require('../models/buyer');
var OrderModel = require('../models/order');

module.exports.createOrder = function(req, callback){
    let rest_details;
    let cust_details;
    let getRestDetails = new Promise((resolve, reject) => {
         SellerModel.findById(req.rest_id, "-items -sections -password", function(err, result) {
           if(err) {
             reject({
                 success: false,
                 msg: "Something went wrong",
                 msgDesc: err
             })
           } else {
             resolve(result);
           }
       });
    })
    let getCustDetails = new Promise((resolve, reject) => {
         BuyerModel.findById(req.cust_id, "-password", function(err, result) {
           if(err) {
             reject({
                 success: false,
                 msg: "Something went wrong",
                 msgDesc: err
             })
           } else {
              resolve(result);
           }
         });
     })
     getRestDetails
       .then(data => {
         rest_details = data;
         return getCustDetails;
       })
       .then(data => {
           cust_details = data;
           let newOrder = new OrderModel({
             rest_id: req.rest_id,
             cust_id: req.cust_id,
             rest_details: rest_details,
             cust_details: cust_details,
             order_ts: new Date(),
             items: req.items,
             total: req.total
           })
           newOrder.save(function (err, resp) {
            
           if(err) {
                 callback(null,{
                     success: false,
                     msg: err.message,
                     msgDesc: err
                 })
           } else{
               callback(null,{
                 success: true,
                 msg: "Successfully placed your order",
                 msgDesc: resp
               }) 
             }
         });
       })
       .catch(err => callback(err));
};

module.exports.updateOrder = function(req, callback){
    let search = {
        "_id": req.order_id
    }
    let update = {
       $set: { "status": req.status }
    }
    OrderModel.findOneAndUpdate(search, update , {safe: true , new : true,  useFindAndModify: false}, function(err, result){
      if(err) {
         callback(null,{
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
      } else {
         callback(null,{
              success: true,
              msg: "Successfully updated the order status" ,
              msgDesc: result
          }) 
      }
    });
}

module.exports.getBuyerOrders = function(req, callback){ 
    let search = {
        cust_id: req.cust_id
     }
     OrderModel.find(search, "-cust_details", function(err, result) {
         if(err) {
            callback(null,{
               success: false,
               msg: "Something went wrong",
               msgDesc: err
           })
         } else {
            callback(null,{
               success: true,
               msg: "Got order history" ,
               msgDesc: result
           }) 
         }
     }).sort({order_ts:-1});
}

module.exports.getSellerOrders = function(req, callback){
     let search = {
        rest_id: req.rest_id
     }
     OrderModel.find(search, function(err, result) {
         if(err) {
            callback(null,{
               success: false,
               msg: "Something went wrong",
               msgDesc: err
           })
         } else {
            callback(null,{
               success: true,
               msg: "Got order history" ,
               msgDesc: result
           }) 
         }
     }).sort({order_ts:-1}); 
}

