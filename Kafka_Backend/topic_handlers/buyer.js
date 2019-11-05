var buyerService = require('../services/buyer_service');

const messageServiceMap = {
    'GETPROFILEBUYER' : buyerService.getProfile,
    'UPDATEBUYERPROFILE' : buyerService.updateBuyerProfile,
    'REGISTERBUYER' : buyerService.registerBuyer,
    'SEARCHRESTS': buyerService.search,
    'GETCUISINELIST': buyerService.getCuisineList
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

