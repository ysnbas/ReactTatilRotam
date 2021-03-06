const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// const MekanlarSchema = new Schema({
//   AraYerler:{type:String}
// })
const RotalarSchema=new Schema({
    userID:{type:Schema.Types.ObjectId},
    BaslangicNoktasi:{ type: String},
    BitisNoktasi:{ type: String },
    Rotalar:[{type:String}]
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
RotalarSchema.pre('update', function (next) {
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
module.exports=mongoose.model('rotas',RotalarSchema)


