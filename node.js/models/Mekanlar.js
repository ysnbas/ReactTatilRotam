const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const MekanlarSchema=new Schema({
    Mekanlar:{ type: String},
    AraYerler:{ type: String},
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
module.exports=mongoose.model('mekans',MekanlarSchema)
