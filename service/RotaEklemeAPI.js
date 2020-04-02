import axios from 'react-native-axios';
const RotaEklemeAPI = rota => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/rotalar/newRoute', {
        BaslangicNoktasi: rota.Basnoktasi,
        BitisNoktasi: rota.Bitnoktasi,
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

module.exports = RotaEklemeAPI;
