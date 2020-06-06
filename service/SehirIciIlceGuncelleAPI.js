import axios from 'react-native-axios';
import URL from './URL';

const SehirIciIlceGuncelle = (rota, rota1) => {
  const mekanAdlari = rota.mekanAdi.split(',');
  const mekanAciklamalari = rota.mekanAciklama.split(',');
  var Mekanlar = [];

  for (let index = 0; index < mekanAdlari.length; index++) {
    Mekanlar.push({
      mekanAdi: mekanAdlari[index],
      mekanAciklama: mekanAciklamalari[index],
    });
  }
  console.log(rota1);
  return new Promise((resolve, reject) => {
    axios
      .put(URL + '/mekanlar/' + rota1, {
        Mekanlar,
        Aciklama: rota.aciklama,
        BaslangicTarihi: rota.BasDate,
        BitisTarihi: rota.BitDate,
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
module.exports = SehirIciIlceGuncelle;
