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

module.exports = router;
