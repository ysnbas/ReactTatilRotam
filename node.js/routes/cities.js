var express = require('express');
var router = express.Router();
const CitySchema=require('../models/Sehirler');
MongoClient = require('mongodb').MongoClient,


router.get('/sehirler', function(req, res) { 
    MongoClient.connect('mongodb://127.0.0.1:27017/tatilRotam', function (err, db) {
        if (err) throw err;

        var coll = db.collection('sehirlers');
        var arr = [];
        coll.find({}, function (err, docs) {
            console.log(docs);
            docs.each(function (err, doc) {
                if (doc) {
                    console.log(doc);
                    arr.push(doc);

                } else {
                    res.end();
                }
            });
            return res.json(arr);
        });
    });
})
    
module.exports = router;
