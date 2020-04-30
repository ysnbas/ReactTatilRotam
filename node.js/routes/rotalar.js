var express = require('express');
var router = express.Router();
const RotalarSchema=require('../models/Rotalar');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

router.post('/newRoute', function(req, res, next) {
    const rota=new RotalarSchema({  
        userID:req.body.userID,
        BaslangicNoktasi:req.body.BaslangicNoktasi,
        BitisNoktasi:req.body.BitisNoktasi,
        Rotalar:req.body.Rotalar,
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

router.delete('/deleterota',function(req,res,next){
 
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db("tatilRotam");
    var myquery = { "_id":  ObjectID};
    console.log(myquery)
    dbo.collection("rotas").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
     
    });
  })
})
router.post('/rotaguncelle', function(req, res, next) {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tatilRotam");
    var myquery = { "_id":  ObjectID};
    var newvalues = { $set: {BaslangicNoktasi:req.body.BaslangicNoktasi,BitisNoktasi:req.body.BitisNoktasi,Rotalar:req.body.Rotalar} };
    dbo.collection("rotas").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
      console.log(newvalues)
    });
  });

});
router.post('/ararotaguncelle', function(req, res, next) {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tatilRotam");
    var myquery = { "_id":  ObjectID};
    var newvalues = { $set: {BaslangicNoktasi:req.body.BaslangicNoktasi,BitisNoktasi:req.body.BitisNoktasi,Rotalar:req.body.Rotalar} };
    dbo.collection("rotas").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
      console.log(newvalues)
    });
  });

});

module.exports = router;
