const mongoose=require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;
const CitySchema=new Schema({
    sehirPlaka:{ type: Number },
    sehirAdi:String
});

module.exports=mongoose.model('sehirlers',CitySchema)