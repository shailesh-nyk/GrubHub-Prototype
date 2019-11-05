var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

//GET SELLER PROFILE DETAILS
router.get('/', function(req, res) {
    let request = {
        body: req.query,
        message: 'GETPROFILESELLER'
    }
    kafka.make_request('seller', request, res);
});

//UPDATE SELLER PROFILE
router.put('/', (req, res, next) => {
    let request = {
        body: req.body,
        message: 'UPDATESELLERPROFILE'
    }
    kafka.make_request('seller', request , res);
});



//TO ADD NEW SECTION
router.post('/sections', (req, res) => {
    let request = {
      body: req.body,
      message: 'ADDSECTION'
    }
    kafka.make_request('seller', request , res);
});


//TO ADD NEW ITEMS TO A RESTAURANT
router.post('/menu', (req, res) => {
    let request = {
        body: req.body,
        message: 'ADDITEM'
    }
    kafka.make_request('seller', request , res);
});

//GET ITEMS SOLD BY A RESTAURANT
router.get('/menu', (req, res) => {
    let request = {
        body: req.query,
        message: 'GETITEMS'
    }
    kafka.make_request('seller', request , res);
});


//GET ALL SECTIONS
router.get('/sections', (req, res, next) => {
    let request = {
      body: req.query,
      message: 'GETSECTIONS'
  }
  kafka.make_request('seller', request , res);
});

//UPDATE MENU SECTION
router.put('/sections', (req, res, next) => {
    let request = {
        body: req.body,
        message: 'UPDATESECTIONS'
    }
    kafka.make_request('seller', request , res);
});

//DELETE MENU SECTION
router.delete('/sections', (req, res, next) => {
    let request = {
        body: req.body,
        message: 'DELETESECTION'
    }
    kafka.make_request('seller', request , res);
});

//UPDATE ITEM DETAILS
router.put('/menu', (req, res, next) => {
    let request = {
        body: req.body,
        message: 'UPDATEITEMS'
    }
    kafka.make_request('seller', request , res);
});

//DELETE ITEM
router.delete('/menu', (req, res, next) => {
    let request = {
        body: req.body,
        message: 'DELETEITEM' 
    }
    kafka.make_request('seller', request , res);
});


//UPDATE SORT ORDER
router.post('/update-sort-order', (req, res, next) => {
    let request = {
      body: req.body,
      message: 'UPDATESORTORDER' 
    }
    kafka.make_request('seller', request , res);
});

module.exports = router;
