var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var buyerSchema = new Schema({
    name: { type: String , required: true },
    email: { type: String , required: true , unique: true },
    password: { type: String , required: true },
    address: { type: String , required: true },
    zipcode: { type: String , required: true },
    phone: { type: String , required: true },
    image: { type: String , default: "public/images/no-dp.png" }
})

buyerSchema.pre('save', function(next) {
    bcrypt.hash(this.password, saltRounds, (err, hash) => { 
        this.password = hash;
    });
    next();
});

var BuyerModel = mongoose.model('buyers', buyerSchema);

module.exports = BuyerModel;