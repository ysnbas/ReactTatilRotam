import axios from 'react-native-axios';
const MekanEKleAPI = rota => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/mekanlar/newmekan', {
        mekan: rota.mekan,
      })
      .then(function(response) {
        console.log(response.data.status);
        if (response.data.status === true) {
          resolve();
        }
      })
      .catch(function() {
        reject('Servis bağlantı hatası !');
      });
  });
};

module.exports = MekanEKleAPI;
