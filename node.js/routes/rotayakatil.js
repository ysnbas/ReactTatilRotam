var express = require('express');
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

module.exports = router;
