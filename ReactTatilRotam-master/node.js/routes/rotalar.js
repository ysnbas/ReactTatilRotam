var express = require('express');
var router = express.Router();
const RotalarSchema=require('../models/Rotalar');

router.post('/newRoute', function(req, res, next) {
    const rota=new RotalarSchema({
        BaslangicNoktasi:req.body.BaslangicNoktasi,
        BitisNoktasi:req.body.BitisNoktasi
    })
    rota.save((err,data)=>{
      if(err){
        console.log(err)
        res.json(err);
  
      }
      
       res.json(data);
    })
  
});

router.get('/rotas',function(req, res, next){
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tatilRotam");
  dbo.collection("rotas").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    res.json(result)
  });
});
})
module.exports = router;
