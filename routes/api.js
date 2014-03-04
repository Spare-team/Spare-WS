var ObjectId = require("mongojs").ObjectId;

exports.index  = function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.send("API RESTful 0.01");
};

exports.productos = function(request, response){
	db.Products.find(function(err, Products) {
  		if( err || !Products) 
  			response.send("No products found");
  		else 
  			response.send(Products);
	});
}
// Rios User wdf!
exports.userMarcados = function(request, response){
        db.Products.find(function(err, Products) {
            if( err || !Products) 
                response.send("No products found");
            else 
                response.send(Products);
        });
    // var id = request.params.id;
    // db.Users.find({_id:: ObjectId(id)},function(err, userParameter) {
    //     if( err || !userParameter) 
    //         response.send("No users found");
    //     else{
    //             var aProductosMarcados=userParameter.productosMarcados;
    //             for (var p in aProductosMarcados)
    //             {
    //                 theUser.
    //             }
    //         }

// db.Products.find(
// var pm=db.Users.findOne({'productosMarcados.$ref':'Products'})
// var aProductosUsuario=[];

// pm.productosMarcados.forEach(function(doc){

//  var producto=doc.fetch(); aProductosUsuario.push(producto); 
// })





// , function(err, Products) {
//         if( err || !Products) 
//             response.send("No products found");
//         else 
//             response.send(Products);
//     });
}



exports.producto = function(request, response){
	var id = request.params.id;
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
        if (typeof jsn.model === 'undefined'){
            msg = "You dont have defined the field model";
        } else if (typeof jsn.brand === 'undefined'){
	        msg = "You dont have defined the field brand";
        } else if (typeof jsn.description === 'undefined'){
	        msg = 'You dont have defined the field description';
        } else if (typeof jsn.cat === 'undefined'){
	        msg = "You dont hace defined the field Category";
        } else if (typeof jsn.subcat === 'undefined'){
	        msg = "You dont have defined the field SubCategory";
  	    } else if (msg === ""){
            db.Products.find({'model' : jsn.model, 'brand': jsn.brand }, function(err, Products){ 
                if(Products.length > 0){
                    msg = "The product alredy exists";
                    response.status(200);
                    response.send(msg);
                    response.set("Connection", "close");
                }
                else if (msg === ""){
                    db.Categories.find({'cat' : jsn.cat, 'subcat': jsn.subcat }, function(err, Products){
                        if(Products.length === 0){
                            msg = "Somenthing is wrong with Categories";
                            response.status(200);
                            response.send(msg);
                            response.set("Connection", "close");
                        }else{
                            var nwProduct = {
                                "model" : jsn.model,
                                "brand" : jsn.brand,
                                "description" : jsn.description,
                                "cat": jsn.cat,
                                "subcat" : jsn.subcat
                            };

                            db.Products.save(nwProduct, function(err, Products){
                                if( err || !Products) 
                                {
                                    response.status(200);
                                    response.send("You can not add a product");
                                } else {
                                    response.status(201);
                                    response.send(Products);
                                }
                            });
                        }
                    });
                } else if (msg !== ""){
                    response.status(200);
                    response.send(msg);
                    response.set("Connection", "close");
                }
            });
        } else if (msg !== "") {
            response.status(200);
            response.send(msg);
            response.set("Connection", "close");
        }
    }
}

exports.auth = function (request, response){
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
//curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"user": "omis rios"}' http://189.190.254.128:3000/api/producto/add
