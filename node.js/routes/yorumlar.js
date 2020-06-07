var express = require('express');
const mongoose = require("mongoose");

var router = express.Router();
const YorumlarSchema=require('../models/Yorumlar');
router.get("/:RotaID", (req, res) => {
    const promise = YorumlarSchema.aggregate([
        {
            $lookup: {
                from: "mekans",
                localField: "RotaID",
                foreignField: "_id",
                as: "yorumlar"
            }
        },
        
        {
            $unwind: "$yorumlar",
        },  
        {
            $match: {
              'RotaID': mongoose.Types.ObjectId(req.params.RotaID)
          }     
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
  router.get("/kullanici/:UserID", (req, res) => {
    const promise = YorumlarSchema.aggregate([
        {
            $lookup: {
                from: "isims",
                localField: "UserID",
                foreignField: "_id",
                as: "yorumlar1"
            }
        },
        
        {
            $unwind: "$yorumlar1",
        },  
        {
            $match: {
              'UserID': mongoose.Types.ObjectId(req.params.UserID)
          }     
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

router.post('/yorumekle', function(req, res, next) {
    const rota=new YorumlarSchema({
        KullaniciAdi:req.body.KullaniciAdi,
        Yorum:req.body.Yorum,
        UserID:req.body.UserID,
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
router.delete("/:rota_id", (req, res, next) => {
    const promise = YorumlarSchema.findByIdAndRemove(req.params.rota_id);
  
    promise
      .then(YorumlarSchema => {
        if (!YorumlarSchema) {
          next({ message: "The movie was not found", code: 99 });
        }
        res.json({ status: 1 });
      })
      .catch(err => {
        res.json(err);
      });
  });
module.exports = router;
