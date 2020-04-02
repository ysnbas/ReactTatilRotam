import axios from 'react-native-axios';
const DeleteRotalarAPI = rota => {
  return new Promise((resolve, reject) => {
    fetch('http://192.168.0.26:3000/rotalar/deleterota', {
      method: 'DELETE',
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

module.exports = DeleteRotalarAPI;
