import axios from 'react-native-axios';
const SehirIciIlceGuncelle = rota => {
  // const splitRotaNoktasi = rota.sehirler.split(',');
  // var Sehirler = [];
  // for (let index = 1; index < splitRotaNoktasi.length; index++) {
  //   Sehirler.push(splitRotaNoktasi[index]);
  // }

  const splitMekanlar = rota.mekanlar.split(',');
  var Mekanlar = [];
  for (let index = 0; index < splitMekanlar.length; index++) {
    Mekanlar.push(splitMekanlar[index]);
  }
  console.log(rota.mekanlar);

  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/mekanlar/SehirIciIlceguncelle', {
        // Sehirler,
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
