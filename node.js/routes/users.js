var express = require('express');
var router = express.Router();
const UsersSchema=require('../models/Users');
/* GET users listing. */
router.post('/new', function(req, res, next) {
  const user=new UsersSchema({
    isim:req.body.isim,
    soyisim:req.body.soyisim,
    kullaniciAdi:req.body.kullaniciAdi,
    Sifre:req.body.Sifre,
    SifreTekrar:req.body.SifreTekrar,
    Email:req.body.Email
  })
  user.save((err,data)=>{
    if(err){
      console.log(err)
      res.json(err);
    }
    
   
     res.json(data);
  })
  
  

});
router.post('/girisK', function(req, res, next) {
  res.send("aslşdkaslşd")
})
module.exports = router;
