var express = require('express');
var router = express.Router();
var OrderModel = require('../models/order');
var SellerModel = require('../models/seller');
var BuyerModel = require('../models/buyer');


router.post('/', (req, res) => {
  
   let rest_details;
   let cust_details;
   let getRestDetails = new Promise((resolve, reject) => {
        SellerModel.findById(req.body.rest_id, "-items -sections -password", function(err, result) {
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
        BuyerModel.findById(req.body.cust_id, "-password", function(err, result) {
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
            rest_id: req.body.rest_id,
            cust_id: req.body.cust_id,
            rest_details: rest_details,
            cust_details: cust_details,
            order_ts: new Date(),
            items: req.body.items,
            total: req.body.total
          })
          newOrder.save(function (err, resp) {
           
          if(err) {
                res.send({
                    success: false,
                    msg: err.message,
                    msgDesc: err
                })
          } else{
              res.send({
                success: true,
                msg: "Successfully placed your order",
                msgDesc: resp
              }) 
            }
        });
      })
      .catch(err => res.send(err));
});


//UPDATE ORDER STATUS
router.put('/', (req, res, next) => {
    console.log(req.body)
    let search = {
        "_id": req.body.order_id
    }
    let update = {
       $set: { "status": req.body.status }
    }
    OrderModel.findOneAndUpdate(search, update , {safe: true , new : true,  useFindAndModify: false}, function(err, result){
      if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
      } else {
          res.send({
              success: true,
              msg: "Successfully updated the order status" ,
              msgDesc: result
          }) 
      }
 });
});

router.get('/customer', (req, res, next) => {
  let search = {
     cust_id: req.query.cust_id
  }
  OrderModel.find(search, "-cust_details", function(err, result) {
      if(err) {
        res.send({
            success: false,
            msg: "Something went wrong",
            msgDesc: err
        })
      } else {
        res.send({
            success: true,
            msg: "Got order history" ,
            msgDesc: result
        }) 
      }
  }).sort({order_ts:-1}); 
});

router.get('/restaurant', (req, res, next) => {
  let search = {
     rest_id: req.query.rest_id
  }
  OrderModel.find(search, function(err, result) {
      if(err) {
        res.send({
            success: false,
            msg: "Something went wrong",
            msgDesc: err
        })
      } else {
        res.send({
            success: true,
            msg: "Got order history" ,
            msgDesc: result
        }) 
      }
  }).sort({order_ts:-1}); 
});

//Get messages for an order
router.get('/messages', (req, res, next) => {
  OrderModel.findById(req.query.order_id, "messages", function(err, result) {
      if(err) {
        res.send({
            success: false,
            msg: "Something went wrong",
            msgDesc: err
        })
      } else {
        res.send({
            success: true,
            msg: "Got order messages" ,
            msgDesc: result
        }) 
      }
  })
});

//Send a message
router.put('/messages', (req, res, next) => {
    console.log(req.body)
    let search = {
        "_id": req.body.order_id
    }
    let message = req.body.message;
    message['timestamp'] = Date.now();
    let update = {
       $push: { "messages": message }
    }
    OrderModel.findOneAndUpdate(search, update , {safe: true , new : true,  useFindAndModify: false}, function(err, result){
      if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
      } else {
          res.send({
              success: true,
              msg: "Message Sent" ,
              msgDesc: result.messages
          }) 
      }
 });
});


module.exports = router;
