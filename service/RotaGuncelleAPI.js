import axios from 'react-native-axios';
const RotaGuncelleAPI = rota => {
  const splitRotaNoktasi = rota.rotanoktasi.split(',');
  var Rotalar = [];
  for (let index = 1; index < splitRotaNoktasi.length; index++) {
    Rotalar.push(splitRotaNoktasi[index]);
  }
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/rotalar/rotaguncelle', {
        BaslangicNoktasi: rota.Basnoktasi,
        BitisNoktasi: rota.Bitnoktasi,
        Rotalar,
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
module.exports = RotaGuncelleAPI;
