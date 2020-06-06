import URL from './URL';

import axios from 'react-native-axios';
const IkinciAraRotaGuncelleAPI = (rota, rota1) => {
  const mekanAdlari = rota.mekanAdi.split(',');
  const mekanAciklamalari = rota.mekanAciklama.split(',');
  var Mekanlar = [];

  for (let index = 0; index < mekanAdlari.length; index++) {
    Mekanlar.push({
      mekanAdi: mekanAdlari[index],
      mekanAciklama: mekanAciklamalari[index],
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .put(URL + '/mekanlar/' + rota1, {
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
