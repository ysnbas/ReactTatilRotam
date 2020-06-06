import URL from './URL';

const getRotaAPI = rota => {
  return new Promise((resolve, reject) => {
    fetch(URL + '/mekanlar/rotas', {
      method: 'GET',
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

module.exports = getRotaAPI;
