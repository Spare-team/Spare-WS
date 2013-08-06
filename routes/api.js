ObjectId = require("mongojs").ObjectId;

exports.index  = function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.send("API RESTful 0.01");
};

exports.productos = function(request, response){
  debugger;
	db.Products.find(function(err, Products) {
  		if( err || !Products) 
  			response.send("No products found");
  		else 
  			response.send(Products);
	});
}

exports.producto = function(request, response){
	var id = request.params.id;
  console.log("-----------------------------" + id);
	db.Products.find({ _id : ObjectId(id)  }, function(err, Products) {
  		if( err || !Products) 
  			response.send("No products found");
  		else 
  			response.send(Products);
	});
}

exports.producto_add = function (request, response){
    if(request.is('application/json'))
    {
	var jsn = request.body;
	var msg = "";
	if (typeof jsn.model === 'undefined')
	    msg = "You dont have defined the field model";
	if (typeof jsn.brand === 'undefined')
	    msg = "You dont have defined the field brand";
	if (typeof jsn.description === 'undefined')
	    msg = 'You dont have defined the field description';
	if (typeof jsn.cat === 'undefined')
	    msg = "You dont hace defined the field Category";
	if (typeof jsn.subcat === 'undefined')
	    msg = "You dont have defined the field SubCategory";
	
	if(msg)
	{
	    response.send(msg);
	    response.set("Connection", "close");
	}else{
	    db.Products.save(jsn, function(err, Products){
		if( err || !Products) 
		    response.send("Cant add a Product");
                else 
		    response.send("you add a Product");
	    });
	}
    }
}

exports.auth = function (request, response){
  console.log(typeof request.session.user );
  if (typeof request.session.user != undefined){
    var data = request.body;
    console.log('user : ' + data.user);
    console.log('pass : ' + data.pass);
    db.users.find({ username : data.user , password : data.pass}, function(err, Products) {
      if( err || !Products) 
        response.send("No te puedes logear chamaco");
      else {
        if(Products.length === 0 ){
            response.end('{"msg":"tu usuario o contraseña estan mal"}');
        }
        else{
          request.session.user = data.user;
          response.statusCode = 202;
          response.send("{ }");
        }
      }
    });
  }
  else{
    response.send('You\'re Logged Stupid Moron');
  }

}
//curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"user": "omis rios"}' http://189.190.254.128:3000/api/producto/add
