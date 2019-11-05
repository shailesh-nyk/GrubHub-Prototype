var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', (req, res) => {
    let request = {
      body: req.query,
      message: 'SEARCHRESTS'
    }
    kafka.make_request('buyer', request , res);
});

router.get('/cuisine', (req, res, next) => {  
    let request = {
      body: req.query,
      message: 'GETCUISINELIST'
    }
    kafka.make_request('buyer', request , res);
});

module.exports = router;
