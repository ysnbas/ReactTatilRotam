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
    KayitOlmaTarihi:new Date(),
    UyeTuru:'kullanıcı'
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
    
  }).findOne();
  userlogincontrol
    .then(data => {
      if (data != null) {
        return res.json({
          status: true,
          id:data._id
        });
      } else {
        return res.json({
          status: false
        });
      }
    })
})
router.get('/kullanicilar',function(req, res, next){
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tatilRotam");
    dbo.collection("isims").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result)
    });
  });
  })
module.exports = router;
