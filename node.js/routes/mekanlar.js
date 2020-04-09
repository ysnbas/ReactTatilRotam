var express = require('express');
var router = express.Router();
const MekanlarSchema=require('../models/Mekanlar');
router.post('/arayerler', function(req, res, next) {
    const rota=new MekanlarSchema({
        AraYerler:req.body.AraYerler
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
