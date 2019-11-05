var express = require('express');
var router = express.Router();
const multer = require('multer');
var BuyerModel = require('../models/buyer');
var SellerModel = require('../models/seller');

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//BUYER DP FILE STORAGE CONFIGS
var storageBuyer = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'public/images/buyer')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.png' )
  }
})
var uploadBuyer = multer({ 
    storage: storageBuyer ,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('file');

//SELLER DP FILE STORAGE CONFIGS
var storageSeller = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'public/images/seller')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.png' )
  }
})
var uploadSeller = multer({ 
    storage: storageSeller ,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('file');


//ITEM IMAGE STORAGE CONFIGS
var storageItems = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'public/images/items')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '.png' )
    }
  })
  var uploadItems = multer({ 
    storage: storageItems ,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  }).single('file');
  

//APIS
router.post('/buyer', (req, res) => {
    uploadBuyer(req, res, next = (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }else {
            console.log(req.file);
            BuyerModel.update( { _id: req.file.originalname }, {image: req.file.destination + '/' + req.file.filename}, function(err, result){
                if(err) {
                    res.send({
                        success: false,
                        msg: "Something went wrong",
                        msgDesc: err
                    })
                } else {
                    res.send({
                        success: true,
                        msg: "Successfully updated your profile picture" ,
                        msgDesc: req.file.destination + '/' + req.file.filename
                    }) 
                }
            });
        }
    })
});

router.post('/seller', (req, res) => {
    uploadSeller(req, res, next = (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }else {
            console.log(req.file);
            SellerModel.update( { _id: req.file.originalname }, {image: req.file.destination + '/' + req.file.filename}, function(err, result){
                if(err) {
                    res.send({
                        success: false,
                        msg: "Something went wrong",
                        msgDesc: err
                    })
                } else {
                    res.send({
                        success: true,
                        msg: "Successfully updated your profile picture" ,
                        msgDesc: req.file.destination + '/' + req.file.filename
                    }) 
                }
            });
        }
    })
});

router.post('/item', (req, res) => {
    uploadItems(req, res, next = (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }else {
              let search = {
                 "items._id": req.file.originalname
              }
              let update = {
                $set: {
                  "items.$.image": req.file.destination + '/' + req.file.filename
                }
              }
              SellerModel.findOneAndUpdate(search, update , {safe: true , new : true,  useFindAndModify: false}, function(err, result){
                if(err) {
                    res.send({
                        success: false,
                        msg: "Something went wrong",
                        msgDesc: err
                    })
                } else {
                    res.send({
                        success: true,
                        msg: "Successfully added item" ,
                        msgDesc: result
                    }) 
                }
              });
        }
    })
});

module.exports = router;