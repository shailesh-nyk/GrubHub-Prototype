var orderService = require('../services/order_service');

const messageServiceMap = {
     'CREATEORDER': orderService.createOrder,
     'UPDATEORDER': orderService.updateOrder,
     'GETBUYERORDERS': orderService.getBuyerOrders,
     'GETSELLERORDERS': orderService.getSellerOrders
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

