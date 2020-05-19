import axios from 'react-native-axios';
const IkinciAraRotaGuncelleAPI = rota => {
  const splitRotaNoktasi = rota.rotanoktasi.split(',');
  var Mekanlar = [];
  for (let index = 0; index < splitRotaNoktasi.length; index++) {
    Mekanlar.push(splitRotaNoktasi[index]);
  }
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/mekanlar/SehirIciIlceguncelle', {
        BaslangicTarihi: rota.BasTarihi,
        BitisTarihi: rota.BitTarihi,
        Aciklama: rota.aciklama,
        Mekanlar,
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
module.exports = IkinciAraRotaGuncelleAPI;
