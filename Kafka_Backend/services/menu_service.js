var SellerModel = require('../models/seller');

module.exports.addSection = function(req, callback){ 
    let update = {
            $push: { sections: {
            section_name: req.section_name 
            }   }
    }
    SellerModel.findOneAndUpdate({ _id: req.rest_id }, update , {safe: true , new : true, useFindAndModify: false}, function(err, result){
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully added section" ,
                msgDesc: result
            }) 
        }
    });
}

module.exports.addItem = function(req, callback) {
    let item = {
        name: req.name,
        description: req.desc,
        price: req.price,
        section: req.section,
        image: "public/images/no-image.png"
      }
      let search = {
         _id: req.rest_id
      }
      let update = {
        $push: {
           items: item
        }
      }
      SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        console.log(result.items);
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully added item" ,
                msgDesc: result.items[result.items.length - 1]._id
            }) 
        }
      });
}

module.exports.getItems = function(req, callback) { 
    SellerModel.where({ _id: req.rest_id }).findOne(function (err, result) {
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
                msg: "Successfully fetched the restaurant menu" ,
                msgDesc: result.items
            }) 
        } 
    });
}

module.exports.getSections = function(req, callback) { 
    SellerModel.where({ _id: req.rest_id }).findOne(function (err, result) {
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
              msg: "Successfully fetched the restaurant menu" ,
              msgDesc: result.sections.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1)
          }) 
      } 
    });
}

module.exports.updateSections = function(req, callback) {
        let search = {
        "sections._id": req.section_id
        }
        let update = {
        $set: {
            "sections.$.section_name": req.section_name
        }
        }
        SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully updated the section" ,
                msgDesc: result.sections[result.sections.length -1]
            }) 
        }
        });
}

module.exports.updateItems = function(req, callback) {
        let search = {
            "items._id": req.item_id
        }
        let update = {
        $set: {
            "items.$.name": req.name,
            "items.$.description": req.desc,
            "items.$.price": req.price,
            "items.$.section": req.section
        }
        }
        SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully updated the item details" ,
                msgDesc: result.items.find(x =>  x._id == req.item_id)
            }) 
        }
        });
}

module.exports.deleteSection = function(req, callback) {
    let search = {
        _id : req.rest_id
      }
      let update = {
        $pull :  { sections : { _id: req.section_id },
        items : { section : req.section_id } }
      }
      SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully deleted the section" ,
                msgDesc: result.sections
            }) 
        }
      });
}
module.exports.deleteItem = function(req, callback) {
    let search = {
        _id : req.rest_id
      }
      let update = {
        $pull :  { items : { _id: req.item_id } }
      }
      SellerModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully deleted the item" ,
                msgDesc: result.items
            }) 
        }
      });
}

module.exports.updateSortOrder = function(req, callback) {
    for(let i = 0 ; i < req.list.length ; i++) {
        let search = {
          "sections._id": req.list[i]
        }
        let update = {
          $set: { 
            "sections.$.sort_order": i + 1
          }
        }
        SellerModel.findOneAndUpdate(search, update , {safe: true, useFindAndModify: false}, function(err, result){});
    }
    callback(null,{
        success: true,
        msg: "Successfully updated sort order" ,
        msgDesc: null
    }) 
}



