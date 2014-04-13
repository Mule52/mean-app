// MODULES DEPENDENCIES
var express         = require('express');
var routes          = require('./routes');
var user            = require('./routes/user');
var task            = require('./routes/task');
var http            = require('http');
var path            = require('path');
var db              = require('./models');
var app             = express();
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var path            = require('path');
var mysql           = require('mysql');

// DATABASE
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Passw0rd!'
// });

var connection = mysql.createConnection({
  'host':'localhost',
  'port':3306,
  'user':'root',
  'password':'Passw0rd!'
});
// var connection = mysql.createConnection('mysql://root:Passw0rd!@127.0.0.1:3306/data_base?debug=true');
//     connection.connect(function(err){
//         if (err) {
//             console.log(err);
//         }
//     }
// );

// connection.query("SET time_zone='+"+new Date().getTimezoneOffset()/60*(-1)+":00'", 
//   function(error, result) {
//     if (error) { console.log('Query error : '+error); }
//   }
// );

connection.query('USE sakila');

// ENVIRONMENT
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public')); 
app.use(logger('dev'));           // log every request to the console
app.use(bodyParser());            // pull information from html in POST
app.use(methodOverride());          // simulate DELETE and PUT
//app.use(app.router) // has been removed and middleware and routes are executed in the order they are added


// ROUTES
// app.get('/', routes.index);
// app.get('/partials/:name', routes.partials);
// app.get('*', routes.index);


// app.get('/hello', function(req, res){
//   res.send('Hello World...');
// });

// console.log(app.get('port'));
// http.createServer(app).listen(app.get('port'), function () {
//   console.log('Server listening on port ' + app.get('port'));
// });
app.get('/', function(req, res){
  connection.query('SELECT * FROM sakila.customer', function(err, rows){
    console.log(rows);
    res.render('customer', {customer : rows});
    // res.render("index");
    if (err) {console.log(err);}
  });
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
