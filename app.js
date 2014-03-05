/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');


var app = express();

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/local');
/*
 	++Schemas
*/

var productSchema = Schema({ 
	model : String,
	brand : String,
	description : String,
	cat : String,
	subcat : String,
	_ranks : [{ type: Schema.Types.ObjectId, ref : 'ranking' }],
	_createdBy : { type: Schema.Types.ObjectId, ref : 'user' }
});


var rankingSchema = Schema({
	_product : { type : Schema.Types.ObjectId, ref : 'product' },
	_user : { type : Schema.Types.ObjectId, ref : 'user' },
	rank : Number
});

var userSchema = Schema({
	user : String,
	name : String,
	lastName : String,
	email : String,
});

var Product = mongoose.model('product', productSchema );
var Ranking = mongoose.model('ranking',  rankingSchema );
var User = mongoose.model('user', userSchema );

/*
	//Schemas
*/

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

app.get('/api', api.index);//info del api
app.get('/api/productos', function(req, res){
 Product.find(function(error,data){
        if (error) return;
        res.send( data );
    });
});//Todos los productos

app.get('/api/producto/:id', function(req, res){
	var id = req.params.id;
	console.log("====> " + id);
    Product.find({ _id : id  }, function(error,data){
    if (error) return;
        res.send( data );
    });
});//id de producto 
//app.post('/api/productos', api.producto_add);//

//app.post('/api/auth', api.auth);
// app.get('/api/producto/edit/:id', api.productoedit);

// app.get('/api/producto/del', api.productoedit);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});