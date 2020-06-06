import axios from 'react-native-axios';
const DeleteIlIlce = rota => {
  return new Promise((resolve, reject) => {
    fetch('http://192.168.0.26:3000/mekanlar/' + rota + '', {
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

module.exports = DeleteIlIlce;
