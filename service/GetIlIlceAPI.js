import URL from './URL';

const GetRotalarAPI = rota => {
  return new Promise((resolve, reject) => {
    fetch(URL + '/mekanlar/' + rota + '', {
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

module.exports = GetRotalarAPI;
