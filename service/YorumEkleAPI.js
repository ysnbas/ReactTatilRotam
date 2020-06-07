import axios from 'react-native-axios';
const YorumEkleAPI = rota => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/yorumlar/yorumekle', {
        KullaniciAdi: rota.kullaniciadi,
        Yorum: rota.yorum,
        RotaID: rota.rotaId,
        UserID: rota.userId,
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

module.exports = YorumEkleAPI;
