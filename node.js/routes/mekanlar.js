var express = require('express');
var router = express.Router();
const MekanlarSchema=require('../models/Mekanlar');
var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

router.post('/arayerler', function(req, res, next) {
    const rota=new MekanlarSchema({
      userID:req.body.userID,
      // Sehirler:req.body.Sehirler,
      Mekanlar:req.body.Mekanlar,
      Aciklama:req.body.Aciklama,
      BaslangicTarihi:req.body.BaslangicTarihi,
      BitisTarihi:req.body.BitisTarihi
    })
    rota.save((err,data)=>{
      if(err){
        console.log(err)
        res.json(err);
      }
       res.json(data);
    })
});
router.get('/IlIlce',function(req, res, next){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tatilRotam");
    dbo.collection("mekans").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result)
    });
  });
  })
  router.post('/SehirIciIlceguncelle', function(req, res, next) {
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("tatilRotam");
      var myquery = { "_id":  ObjectID};
      var newvalues = { $set: {Mekanlar:req.body.Mekanlar,Aciklama:req.body.Aciklama,BaslangicTarihi:req.body.BaslangicTarihi,BitisTarihi:req.body.BitisTarihi} };
      dbo.collection("mekans").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        console.log(newvalues)
      });
    });
  
  });
 
  router.delete('/deleteIlIlce',function(req,res,next){
 
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url,function(err,db){
      if(err) throw err;
      var dbo = db.db("tatilRotam");
      var myquery = { "_id":  ObjectID};
      console.log(myquery)
      dbo.collection("mekans").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
       
      });
    })
  })
module.exports = router;
