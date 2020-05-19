const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const RotayaKatilSchema=new Schema({
    KullaniciID:{type:Schema.Types.ObjectId},
    RotaID:{type:Schema.Types.ObjectId}
});

RotayaKatilSchema.pre('save', function(next) {
  var self = this;
  
  self.constructor.count(function(err, data) {
    if(err){
       return next(err);
    }
    // if no error do something as you need and return callback next() without error
    console.log('pre save count==', data);
    return next();
  });
});

module.exports=mongoose.model('RotayaKatils',RotayaKatilSchema)


