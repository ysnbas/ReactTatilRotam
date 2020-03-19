import axios from 'react-native-axios';

const loginAPI = user => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.1.28:3000/users/girisK', {
        kullaniciAdi: user.uname,
        Sifre: user.password,
      })
      .then(function(response) {
        console.log(response.data.status);

        if (response.data.status === false) {
          alert('hatalı giriş');
        }
        if (response.data.status === true) {
          resolve();
        }
      })
      .catch(function(error) {
        reject('Servis bağlantı hatası !');
      });
  });
};
module.exports = loginAPI;
