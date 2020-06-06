var express = require('express');
const mongoose = require("mongoose");

var router = express.Router();
const GunlukAktiviteSchema=require('../models/GunlukAkt');
router.get('/aktiviteGetir', function(req, res, next) {
    
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("tatilRotam");
          dbo.collection("gunlukakts").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.json(result)
          });
        });
        })

router.post('/aktiviteEkle', function(req, res, next) {
    const rota=new GunlukAktiviteSchema({
        Gun:req.body.Gun,
        HavaDurumu:req.body.HavaDurumu,
        Aciklama:req.body.Aciklama
    })
    rota.save((err,data)=>{
      if(err){
        console.log(err)
        res.json(err);
  
      }
       res.json(data);
    })
  
});
router.delete("/:aktivite_id", (req, res, next) => {
    const promise = GunlukAktiviteSchema.findByIdAndRemove(req.params.aktivite_id);
  
    promise
      .then(GunlukAktiviteSchema => {
        if (!GunlukAktiviteSchema) {
          next({ message: "The movie was not found", code: 99 });
        }
        res.json({ status: 1 });
      })
      .catch(err => {
        res.json(err);
      });
  });
module.exports = router;
