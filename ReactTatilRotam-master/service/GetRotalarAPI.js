import axios from 'react-native-axios';
const GetRotalarAPI = rota => {
  return new Promise((resolve, reject) => {
    fetch('http://192.168.0.26:3000/rotalar/rotas', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log('->', res);
        resolve(res);
      })
      .catch(function() {
        reject('Servis bağlantı hatası !');
      });
  });
};

module.exports = GetRotalarAPI;
