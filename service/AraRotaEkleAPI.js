import axios from 'react-native-axios';

const AraRotaEkle = rota => {
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
      .post('http://192.168.0.26:3000/mekanlar/arayerler', {
        userID: rota.userId,
        Mekanlar,
        Aciklama: rota.aciklama,
        BaslangicTarihi: rota.BasDate,
        BitisTarihi: rota.BitDate,
      })
      .then(function(response) {
        console.log(response);
        if (response.data.status === true) {
          resolve();
        }
      })
      .catch(function() {
        reject('Servis bağlantı hatası !');
      });
  });
};

module.exports = AraRotaEkle;
