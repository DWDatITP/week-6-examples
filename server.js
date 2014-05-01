var express = require('express');
var exphbs  = require('express3-handlebars');
var app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname+'/views');
app.use(express.static(__dirname + '/public'));

hbs = exphbs.create({
  defaultLayout: 'default',
  extname: '.html'
});

app.engine('html', hbs.engine);
app.set('view engine', 'html');


app.get('/', function (req,res) {
  res.render('index', {
    "title" : "hi!"
  });
});

app.listen(app.get('port'));
console.log('firing up on port %d', app.get('port'));
