var express = require('express');
var router = require('./custom_modules/router.js');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var localdb = "mongodb://localhost:27017/localbooks";
// URI below goes in an environmental variable later. Check out your polling app!
var mLabUri = "mongodb://kris:password@ds153352.mlab.com:53352/books";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
   if (process.env.PORT) {
      console.log("App running on provided port.");
   } else {
      console.log("App running on port 3000.");
   }
});