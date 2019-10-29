'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var BuyerModel = require('./models/buyer');
var SellerModel = require('./models/seller');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "Passphrase for encryption should be 45-50 char long",
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("===========call inside passport middleware");
        let model = BuyerModel;
        if(jwt_payload.role == 'Seller') model = SellerModel;
        model.findById(jwt_payload.id , function (err, res) {
            if(err) {
                return callback(err, false);
            } else {
                console.log(res);
                var user = res;
                delete user.password;
                callback(null, user);
            }
        });
    }));
};
