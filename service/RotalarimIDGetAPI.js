const RotalarimAPI = rota => {
  return new Promise((resolve, reject) => {
    fetch('http://192.168.0.26:3000/rotayakatil/rotalar', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(function() {
        reject('Servis bağlantı hatası !');
      });
  });
};

module.exports = RotalarimAPI;
