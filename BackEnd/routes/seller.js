var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var SellerModel = require('../models/seller');

//TO ADD NEW SECTION
router.post('/sections', (req, res) => {
    let update = {
          $push: { sections: {
            section_name: req.body.section_name 
          }   }
    }
    console.log(req.body)
    SellerModel.findOneAndUpdate({ _id: req.body.rest_id }, update , {safe: true , new : true, useFindAndModify: false}, function(err, result){
      if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
      } else {
          res.send({
              success: true,
              msg: "Successfully added section" ,
              msgDesc: result
          }) 
      }
    });
});


//TO ADD NEW ITEMS TO A RESTAURANT
router.post('/menu', (req, res) => {
      console.log(req.body);
      let item = {
        name: req.body.name,
        description: req.body.desc,
        price: req.body.price,
        section: req.body.section,
        image: "public/images/no-image.png"
      }
      let search = {
         _id: req.body.rest_id
      }
      let update = {
        $push: {
           items: item
        }
      }
      SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        console.log(result.items);
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
                msgDesc: result.items[result.items.length - 1]._id
            }) 
        }
      });
});

//GET ITEMS SOLD BY A RESTAURANT
router.get('/menu', (req, res, next) => {
    SellerModel.where({ _id: req.query.rest_id }).findOne(function (err, result) {
      if (err) {
          res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
          })
      }
      else if(result) {
          res.send({
              success: true,
              msg: "Successfully fetched the restaurant menu" ,
              msgDesc: result.items
          }) 
      } 
    });
});


//GET ALL SECTIONS
router.get('/sections', (req, res, next) => {
    SellerModel.where({ _id: req.query.rest_id }).findOne(function (err, result) {
      if (err) {
          res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
          })
      }
      else if(result) {
          res.send({
              success: true,
              msg: "Successfully fetched the restaurant menu" ,
              msgDesc: result.sections.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1)
          }) 
      } 
    });
});

//GET SELLER PROFILE DETAILS
router.get('/', function(req, res) {
  SellerModel.where({ _id: req.query.id }).findOne(function (err, result) {
    if (err) {
        res.send({
               success: false,
               msg: "Something went wrong",
               msgDesc: err
        })
    }
    else if(result) {
        res.send({
            success: true,
            msg: "Successfully fetched the seller profile" ,
            msgDesc: result
        }) 
    } 
  });
});

//UPDATE SELLER PROFILE
router.put('/', (req, res, next) => {
   bcrypt.hash(req.body.password, saltRounds, (err, hash) => { 
      let user = {
        name: req.body.name,
        address:  req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        zipcode: req.body.zipcode,
        rest_name: req.body.rest_name,
        cuisine: req.body.cuisine.toLowerCase()
      }
      SellerModel.update( { _id: req.body.id }, user , function(err, result){
        if(err) {
            res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            res.send({
                success: true,
                msg: "Successfully updated your user profile" ,
                msgDesc: user
            }) 
        }
      });
  });
});

//UPDATE MENU SECTION
router.put('/sections', (req, res, next) => {
    console.log(req.body);
    let search = {
       "sections._id": req.body.section_id
    }
    let update = {
      $set: {
        "sections.$.section_name": req.body.section_name
      }
    }
    SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
      if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
      } else {
          res.send({
              success: true,
              msg: "Successfully updated the section" ,
              msgDesc: result.sections[result.sections.length -1]
          }) 
      }
    });
});

//DELETE MENU SECTION
router.delete('/sections', (req, res, next) => {
    let search = {
      _id : req.body.rest_id
    }
    let update = {
      $pull :  { sections : { _id: req.body.section_id },
      items : { section : req.body.section_id } }
    }
    SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
      if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
      } else {
          res.send({
              success: true,
              msg: "Successfully deleted the section" ,
              msgDesc: result.sections
          }) 
      }
    });
});

//UPDATE ITEM DETAILS
router.put('/menu', (req, res, next) => {
      let search = {
          "items._id": req.body.item_id
      }
      let update = {
        $set: {
          "items.$.name": req.body.name,
          "items.$.description": req.body.desc,
          "items.$.price": req.body.price,
          "items.$.section": req.body.section
        }
      }
      SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        if(err) {
            res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            res.send({
                success: true,
                msg: "Successfully updated the item details" ,
                msgDesc: result.items.find(x =>  x._id == req.body.item_id)
            }) 
        }
      });
});

//DELETE ITEM
router.delete('/menu', (req, res, next) => {
      let search = {
        _id : req.body.rest_id
      }
      let update = {
        $pull :  { items : { _id: req.body.item_id } }
      }
      SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        if(err) {
            res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            res.send({
                success: true,
                msg: "Successfully deleted the item" ,
                msgDesc: result.items
            }) 
        }
      });
});


//UPDATE MENU SECTION
router.post('/update-sort-order', (req, res, next) => {
  console.log(req.body.list);
  for(let i = 0 ; i < req.body.list.length ; i++) {
    let search = {
      "sections._id": req.body.list[i]
    }
    let update = {
      $set: { 
        "sections.$.sort_order": i + 1
      }
    }
    SellerModel.findOneAndUpdate(search, update , {safe: true, useFindAndModify: false}, function(err, result){});
  }
  res.send({
    success: true,
    msg: "Successfully updated sort order" ,
    msgDesc: null
  }) 
});
module.exports = router;
