var express = require('express');
var exphbs  = require('express3-handlebars');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('port', process.env.PORT || 3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/classsix');

var Person = mongoose.model('Person', {
  name: String,
  age: Number,
  dateAdded: Date,
  active: Boolean
});


app.set('views', __dirname+'/views');
app.use(express.static(__dirname + '/public'));

hbs = exphbs.create({
  defaultLayout: 'default',
  extname: '.html'
});

app.engine('html', hbs.engine);
app.set('view engine', 'html');


app.get('/', function (req,res) {
  Person.find({"active":true}, function (err, data) {
    console.log(data);
    res.render('index', {
      "title" : "hi!",
      "people":data
    });
  });
});

// create a new person
app.post('/person', function (req, res) {
  console.log(req.body);

  var personData = {
    name : req.body.name,
    age: req.body.age,
    dateAdded : Date(),
    active: true
  };

  p = new Person(personData);
  p.save(function (err, person) {
    if (err) {
      console.error(err);
      res.status(500).json({status: "Error!"});
    } else {
      console.log(person);
      res.status(200).json({status:"Success!"});
    }
  });
});

app.listen(app.get('port'));
console.log('firing up on port %d', app.get('port'));
