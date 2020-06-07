var express = require('express');
const mongoose = require("mongoose");

var router = express.Router();
const RotayaKatilSchema=require('../models/RotayaKatil');

router.post('/katil', function(req, res, next) {
    const rota=new RotayaKatilSchema({
        KullaniciID:req.body.KullaniciID,
        RotaID:req.body.RotaID
    })
    rota.save((err,data)=>{
      if(err){
        console.log(err)
        res.json(err);
  
      }
       res.json(data);
    })
  
});
router.get("/:KullaniciID", (req, res) => {
  const promise = RotayaKatilSchema.aggregate([
      {
          $lookup: {
              from: "mekans",
              localField: "RotaID",
              foreignField: "_id",
              as: "rotalar"
          }
      },
      {
          $unwind: "$rotalar",
      },  
      {
        $match: {
          'KullaniciID': mongoose.Types.ObjectId(req.params.KullaniciID)
      }
      },
      
      {
        $project: {
          Mekanlar:"$rotalar.Mekanlar",
          Aciklama: "$rotalar.Aciklama",
          BaslangicTarihi: "$rotalar.BaslangicTarihi",
          BitisTarihi:"$rotalar.BitisTarihi"
        }
      }
  ]); 
  
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/kimlerkatilmis/:RotaID", (req, res) => {
  const promise = RotayaKatilSchema.aggregate([
      {
          $lookup: {
              from: "mekans",
              localField: "RotaID",
              foreignField: "_id",
              as: "rotalar"
          }
      },
      {
        $lookup: {
            from: "isims",
            localField: "KullaniciID",
            foreignField: "_id",
            as: "isimler"
        }
    },
      {
          $unwind: "$rotalar",
          $unwind: "$isimler",
      },  
      {
        $match: {
          'RotaID': mongoose.Types.ObjectId(req.params.RotaID)
      }
      },
      // {
      //   $count: "myCount" 
      // },
      {
        $project: {
          isim:"$isimler.isim",
          soyisim: "$isimler.soyisim",
          kullaniciAdi: "$isimler.kullaniciAdi",
        }
      }
  ]); 
  
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/rotalarim", (req, res) => {
  const promise = RotayaKatilSchema.aggregate([
      {
          $lookup: {
              from: "mekans",
              localField: "RotaID",
              foreignField: "_id",
              as: "rotalar"
          }
      },
      {
          $unwind: "$rotalar",
      },  
      
      {
        $project: {
          Mekanlar:"$rotalar.Mekanlar",
          Aciklama: "$rotalar.Aciklama",
          BaslangicTarihi: "$rotalar.BaslangicTarihi",
          BitisTarihi:"$rotalar.BitisTarihi"
        }
      }
  ]); 
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get('/rotalar',function(req, res, next){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tatilRotam");
    dbo.collection("rotayakatils").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result)
    });
  });
  })
router.delete("/:rota_id", (req, res, next) => {
  const promise = RotayaKatilSchema.findByIdAndRemove(req.params.rota_id);

  promise
    .then(RotayaKatilSchema => {
      if (!RotayaKatilSchema) {
        next({ message: "The movie was not found", code: 99 });
      }
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
