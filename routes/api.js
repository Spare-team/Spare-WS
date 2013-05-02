exports.index  = function(req, res){
	//res.setHeader(200, {'Content-Type': 'text/plain'});
	res.setHeader('Content-Type', 'text/plain');
	res.send("API RESTful 0.01");
};

exports.productos = function(request, response){
	db.things.find(function(err, things) {
  		if( err || !things) 
  			response.send("No products found");
  		else 
  			response.send(things);
	});
}

exports.producto = function(request, response){
	var id = request.params.id * 1;
  console.log("-----------------------------" + id);
  //console.log(typeof id);
	db.things.find({ name : id }, function(err, things) {
  		if( err || !things) 
  			response.send("No products found");
  		else 
  			response.send(things);
	});
}
exports.producto_add = function (request, response){
	var name = request.body;
    //console.log("-----------------------------" + name);
    db.things.save(name, function(err, things){
      if( err || !things) 
        response.send("Cant add a Product");
      else 
        response.send("you add a Product");
    });
}

//curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"user": "omis rios"}' http://189.190.254.128:3000/api/producto/add
