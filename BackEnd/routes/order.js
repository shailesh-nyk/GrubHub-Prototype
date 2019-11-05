var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

//UPDATE ORDER STATUS
router.post('/', (req, res) => {
    let request = {
        body: req.body,
        message: 'CREATEORDER'
    }
    kafka.make_request('order', request , res);
});


//UPDATE ORDER STATUS
router.put('/', (req, res, next) => {
    console.log(req.body)
    let request = {
      body: req.body,
      message: 'UPDATEORDER'
    }
    kafka.make_request('order', request , res);
});

//GET CUSTOMER ORDERS
router.get('/customer', (req, res, next) => {
    let request = {
      body: req.query,
      message: 'GETBUYERORDERS'
    }
    kafka.make_request('order', request , res); 
});

//GET SELLER ORDERS
router.get('/restaurant', (req, res, next) => {
  let request = {
    body: req.query,
    message: 'GETSELLERORDERS'
  }
  kafka.make_request('order', request , res);
});


//Get messages for an order
router.get('/messages', (req, res, next) => {
  let request = {
    body: req.query,
    message: 'GETCHAT'
  }
  kafka.make_request('chat', request , res);
});

//Send a message
router.put('/messages', (req, res, next) => {
    let request = {
      body: req.body,
      message: 'SENDMESSAGE'
    }
    kafka.make_request('chat', request , res);
});


module.exports = router;
