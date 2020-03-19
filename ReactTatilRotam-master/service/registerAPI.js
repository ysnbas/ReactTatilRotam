import axios from 'react-native-axios';
const registerAPI = user => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.1.28:3000/users/new', {
        isim: user.fname,
        soyisim: user.lname,
        kullaniciAdi: user.uname,
        Sifre: user.password,
        SifreTekrar: user.passwordtwo,
        Email: user.email,
      })
      .then(function(response) {
        console.log(response.data.keyPattern.Email);
        if (response.data.keyPattern.Email === 1) {
          alert('Mail daha önce var');
        }
        if (response.data.keyPattern.kullaniciAdi === 1) {
          alert('Kullanıcı adi daha önce var');
        }
      })
      .catch(function() {
        reject('Servis bağlantı hatası !');
      });
  });
};

module.exports = registerAPI;
