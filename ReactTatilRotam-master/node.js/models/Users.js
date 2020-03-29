const mongoose=require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;
const UsersSchema=new Schema({
    isim:String,
    soyisim:String,
    kullaniciAdi:{ type: String, required: true,unique:true },
    Sifre:{ type: String, required: true },
    SifreTekrar:{ type: String, required: true },
    Email:{ type: String, required: true,unique:true },
    KayitOlmaTarihi:{type:Date,required:true},
    UyeTuru:{type:String,required:true}
});
UsersSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('Sifre','SifreTekrar')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.Sifre, salt, function(err, hash) {
            if (err) return next(err);

            // user.Sifre = hash;
            // user.SifreTekrar=hash;
            next();
        });
        if (err) return next(err);

        bcrypt.hash(user.SifreTekrar, salt, function(err, hash) {
            if (err) return next(err);

            // user.SifreTekrar = hash;
            next();
        });  
    });
});
UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
    // bcrypt.compare(candidatePassword, this.Sifre, function(err, isMatch) {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    // });
    // bcrypt.compare(candidatePassword, this.SifreTekrar, function(err, isMatch) {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    // });
};

module.exports=mongoose.model('isim',UsersSchema)