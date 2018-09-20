module.exports = function(app){

  var deposit = require('./controllers/deposit.js');
  app.get('/helloWorld', deposit.helloWorld);
  app.post('/checkCaptcha/:currency', deposit.checkCaptcha);
  app.get('/generateNewAddress/:currency', deposit.generateNewAddress);  
  app.get('/generateNewSeed/', deposit.generateNewSeed);



}

