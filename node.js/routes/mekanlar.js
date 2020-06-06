var express = require('express');
var router = express.Router();
const MekanlarSchema=require('../models/Mekanlar');
var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;

router.post('/arayerler', function(req, res, next) {
  console.log('---->',req.body)
    const rota=new MekanlarSchema({
      userID:req.body.userID,
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
router.get('/rotas',function(req, res, next){
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
router.get("/:userID", (req, res) => {
  const promise = MekanlarSchema.aggregate([
      {
          $lookup: {
              from: "isims",
              localField: "userID",
              foreignField: "_id",
              as: "rotalar"
          }
      },
      {
        $match: {
          'userID': mongoose.Types.ObjectId(req.params.userID)
      }     
      },
      {
          $unwind: "$rotalar",
      },  
  ]); 
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

  // router.post('/:rota_id', function(req, res, next) {
  //   var rota = req.params.rota_id
  //   console.log(rota)
  //   var url = "mongodb://localhost:27017/";
  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("tatilRotam");
  //     var myquery = {"rota_id" : ObjectID};
  //     var newvalues = { $set: {Mekanlar:req.body.Mekanlar,Aciklama:req.body.Aciklama,BaslangicTarihi:req.body.BaslangicTarihi,BitisTarihi:req.body.BitisTarihi} };
  //     dbo.collection("mekans").findOneAndUpdate(myquery, newvalues, function(err, res) {
  //       if (err) throw err;
  //       console.log("1 document updated");
  //       db.close();
  //       console.log(newvalues)
  //     });
  //   });
  // });

  router.put("/:rota_id", (req, res, next) => {
    console.log('s',req.body.Mekanlar)
    var newvalues = { $set: {Mekanlar:req.body.Mekanlar,Aciklama:req.body.Aciklama,BaslangicTarihi:req.body.BaslangicTarihi,BitisTarihi:req.body.BitisTarihi} };

    const promise = MekanlarSchema.findByIdAndUpdate(req.params.rota_id, newvalues, function(err,res){
      if (err) throw err;
      console.log("1 document updated");
      console.log(newvalues)
    });
  
    promise
      .then(MekanlarSchema => {
        if (!MekanlarSchema) {
          next({ message: "The rota was not found", code: 99 });
        }
        res.json(MekanlarSchema);
      })
      .catch(err => {
        res.json(err);  
      });     

  });
  
  // router.delete('/deleteIlIlce',function(req,res,next){
 
  //   var url = "mongodb://localhost:27017/";
  //   MongoClient.connect(url,function(err,db){
  //     if(err) throw err;
  //     var dbo = db.db("tatilRotam");
  //     var myquery = { "_id":  ObjectID};
  //     console.log(myquery)
  //     dbo.collection("mekans").deleteOne(myquery, function(err, obj) {
  //       if (err) throw err;
  //       console.log("1 document deleted");
  //       db.close();
       
  //     });
  //   })
  // })
  router.delete("/:rota_id", (req, res, next) => {
    const promise = MekanlarSchema.findByIdAndRemove(req.params.rota_id);
  
    promise
      .then(MekanlarSchema => {
        if (!MekanlarSchema) {
          next({ message: "The movie was not found", code: 99 });
        }
        res.json({ status: 1 });
      })
      .catch(err => {
        res.json(err);
      });
  });
module.exports = router;
