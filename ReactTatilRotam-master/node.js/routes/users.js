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
    Email:req.body.Email,
    KayitOlmaTarihi:new Date()
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
  const userlogincontrol=UsersSchema.find({
    
    kullaniciAdi:req.body.kullaniciAdi,
    Sifre:req.body.Sifre,
    
  }).count();
  userlogincontrol
    .then(data => {
      console.log(data);
      if (data > 0) {
        return res.json({
          status: true
        });
      } else {
        return res.json({
          status: false
        });
      }
    })
  
})

module.exports = router;
