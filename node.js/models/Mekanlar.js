const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const MekanlarSchema=new Schema({
  userID:{type:Schema.Types.ObjectId},
  // Sehirler:[{ type: String}],
  Mekanlar:[{mekanAdi:{type:String},mekanAciklama:{type:String}}],
  Aciklama:{type:String},
  BaslangicTarihi:{type:Date},
  BitisTarihi:{type:Date}
});
MekanlarSchema.pre('save', function(next) {
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
MekanlarSchema.pre('update', function (next) {
  var self = this;
  self.model.count(function(err, data) {
    if(err){
       return next(err);
    }
    // if no error do something as you need and return callback next() without error
    console.log('pre update count===', data);
    console.log(data)

    return next();
  });
});
module.exports=mongoose.model('mekans',MekanlarSchema)