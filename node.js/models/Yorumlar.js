const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const YorumlarSchema=new Schema({
  KullaniciAdi:{type:String},
  Yorum:{type:String},
  RotaID:{type:Schema.Types.ObjectId},
  UserID:{type:Schema.Types.ObjectId}
});
YorumlarSchema.pre('save', function(next) {
    var self = this;
    self.constructor.count(function(err, data) {
      if(err){
         return next(err);
      }
      console.log('pre save count==', data);
      return next();
    });
});

module.exports=mongoose.model('yorumlars',YorumlarSchema)