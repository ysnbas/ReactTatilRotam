import axios from 'react-native-axios';

const AraRotaEkle = rota => {
  // const splitRotaNoktasi = rota.sehir.split(',');
  // var Sehirler = [];
  // for (let index = 0; index < splitRotaNoktasi.length; index++) {
  //   Sehirler.push(splitRotaNoktasi[index]);
  // }
  const splitMekanlar = rota.mekanlar.split(',');
  var Mekanlar = [];
  for (let index = 0; index < splitMekanlar.length; index++) {
    Mekanlar.push(splitMekanlar[index]);
  }
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/mekanlar/arayerler', {
        userID: rota.userId,
        // Sehirler,
        Mekanlar,
        Aciklama: rota.aciklama,
        BaslangicTarihi: rota.BasDate,
        BitisTarihi: rota.BitDate,
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

module.exports = AraRotaEkle;
