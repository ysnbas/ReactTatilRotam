const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const RotalarSchema=new Schema({
    BaslangicNoktasi:{ type: String,required:true },
    BitisNoktasi:{ type: String,required:true }
    
});
RotalarSchema.pre('save', function(next) {
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

module.exports=mongoose.model('rotas',RotalarSchema)


