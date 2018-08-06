module.exports = function(app){

  var deposit = require('./controllers/deposit.js');
  app.get('/helloWorld', deposit.helloWorld);
  app.post('/checkCaptcha/', deposit.checkCaptcha);
  app.get('/getRandomAddress/', deposit.getRandomAddress);

}

