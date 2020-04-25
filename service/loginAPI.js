import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

const loginAPI = user => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/users/girisK', {
        kullaniciAdi: user.uname,
        Sifre: user.password,
      })
      .then(function(response) {
        console.log(response.data.status);

        if (response.data.status === false) {
          alert('hatalı giriş');
        }
        if (response.data.status === true) {
          AsyncStorage.setItem('id', response.data.id).then(resolve());
        }
      })
      .catch(function(error) {
        reject('Servis bağlantı hatası !');
      });
  });
};
module.exports = loginAPI;
