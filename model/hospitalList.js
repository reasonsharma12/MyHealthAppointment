const mongoose = require ('mongoose');
const hospitalInfo = mongoose.Schema({
    hospitalName: String,
    address: String,
    establishDate: Date,
    email:String,
    phoneNumber: Number,
});


module.exports= mongoose.model('hospitalInfo',hospitalInfo);