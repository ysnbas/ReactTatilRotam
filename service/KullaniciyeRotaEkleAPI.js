import axios from 'react-native-axios';
const KullaniciyeRotaEkle = user => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.0.26:3000/rotayakatil/katil', {
        KullaniciID: user.userId,
        RotaID: user.rotaId,
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

module.exports = KullaniciyeRotaEkle;
