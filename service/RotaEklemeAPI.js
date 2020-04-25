import axios from 'react-native-axios';

const RotaEklemeAPI = rota => {
  const splitRotaNoktasi = rota.rotanoktasi.split(',');
  var Rotalar = [];
  for (let index = 1; index < splitRotaNoktasi.length; index++) {
    Rotalar.push(splitRotaNoktasi[index]);
  }
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/rotalar/newRoute', {
        userID: rota.userId,
        BaslangicNoktasi: rota.Basnoktasi,
        BitisNoktasi: rota.Bitnoktasi,
        Rotalar,
      })
      .then(function(response) {
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
