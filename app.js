
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var app = express();
mongojs = require("mongojs")
db = mongojs('local', ['things']);



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/**
 *	WebSite 
 *
 */
app.get('/', routes.index);
app.get('/users', user.list);

/*
 *  API 0.01 WebService
 *
 */

app.get('/api', api.index);
app.get('/api/productos', api.productos);
app.get('/api/producto/:id', api.producto);
app.post('/api/producto/add', api.producto_add);
// app.get('/api/producto/edit/:id', api.productoedit);

// app.get('/api/producto/del', api.productoedit);











http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

