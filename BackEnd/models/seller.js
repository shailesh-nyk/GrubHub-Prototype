var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var sellerSchema = new Schema({
    name: { type: String , required: true },
    email: { type: String , required: true , unique: true },
    password: { type: String , required: true },
    address: { type: String , required: true },
    zipcode: { type: String , required: true },
    phone: { type: String , required: true },
    image: { type: String , default: "public/images/no-dp.png" },
    password: { type: String , required: true },
    rest_name: { type: String , required: true },
    cuisine: { type: String , required: true},
    items: [{ 
        name: { type: String },
        description: { type: String},
        price:  { type: String},
        section: { type: String} ,
        image: { type: String}
    }],
    sections: [{
         section_name: String ,
         sort_order: { type: Number, default: 999 }
    }]
}, { strict: false });

sellerSchema.pre('save', function(next) {
    bcrypt.hash(this.password, saltRounds, (err, hash) => { 
        this.password = hash;
    });
    next();
});

var SellerModel = mongoose.model('sellers', sellerSchema);

module.exports = SellerModel;