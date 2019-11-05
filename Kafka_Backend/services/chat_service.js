var OrderModel = require('../models/order');

module.exports.sendMessage = function(req, callback){
        let search = {
                "_id": req.order_id
            }
            let message = req.message;
            message['timestamp'] = Date.now();
            let update = {
            $push: { "messages": message }
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
                    msg: "Message Sent" ,
                    msgDesc: result.messages
                }) 
            }
        });
};

module.exports.getChat = function(req, callback){ 
    OrderModel.findById(req.order_id, "messages", function(err, result) {
        if(err) {
            callback(null,{
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
        } else {
            callback(null,{
              success: true,
              msg: "Got order messages" ,
              msgDesc: result
          }) 
        }
    })
}
