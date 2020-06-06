const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const GunlukAktiviteSchema=new Schema({
  Gun:{type:String},
  HavaDurumu:{type:String},
  Aciklama:{type:String},
});
GunlukAktiviteSchema.pre('save', function(next) {
    var self = this;
    self.constructor.count(function(err, data) {
      if(err){
         return next(err);
      }
      console.log('pre save count==', data);
      return next();
    });
});

module.exports=mongoose.model('gunlukakts',GunlukAktiviteSchema)