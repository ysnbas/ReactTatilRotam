import axios from 'react-native-axios';

const register = user => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.10.51:3000/users/new', {
        isim: stateisim,
        soyisim: statesoyisim,
        kullaniciadi: statekadi,
      })
      .then(function(response) {
        if (response.data.status === true) resolve();
        if (response.data.unique === 'kullaniciAdi')
          reject('Bu öğrenci numarası daha önce kullanılmış !');
        if (response.data.unique === 'Email')
          reject('Bu mail daha önceden kullanılmış !');
      })
      .catch(function(error) {
        reject('Servis bağlantı hatası !');
      });
  });
};

module.exports = register;
