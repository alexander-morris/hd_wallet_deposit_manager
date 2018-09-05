// server.js
// Run with 'node server.js' to launch the app

// introduce dependancies
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose   = require('mongoose');


// Set up the db
var mongoUri = 'mongodb://localhost/node';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

// Set up connectivity
var port = 8887;
var router = express.Router();

// Set up H-W routing
router.get('/', function(req, res) {
   res.send('Hello World!');
   console.log('Hello World Ran!');
});

// Set the target area
app.use('/api', router);

// Set the access headers for browser preflight
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Include middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Include models
require('./models/deposit.js');

// Require routes
require('./routes.js')(app);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);

