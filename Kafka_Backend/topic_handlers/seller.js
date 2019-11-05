var sellerService = require('../services/seller_service');
var menuService = require('../services/menu_service');
const messageServiceMap = {
    'GETPROFILESELLER' : sellerService.getProfile,
    'REGISTERSELLER': sellerService.registerSeller,
    'UPDATESELLERPROFILE' : sellerService.updateSellerProfile,
    'ADDSECTION': menuService.addSection,
    'ADDITEM': menuService.addItem,
    'GETITEMS': menuService.getItems,
    'GETSECTIONS': menuService.getSections,
    'UPDATESECTIONS': menuService.updateSections,
    'UPDATEITEMS': menuService.updateItems,
    'DELETESECTION': menuService.deleteSection,
    'DELETEITEM': menuService.deleteItem,
    'UPDATESORTORDER': menuService.updateSortOrder
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

