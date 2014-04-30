var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req,res) {
  res.send(200);
});

app.listen(app.get('port'));
console.log('firing up on port %d', app.get('port'));
