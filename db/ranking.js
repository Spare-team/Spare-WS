/*
* Not Finished
*	
*/
use local;

var producto = db.Products.find({},{model:''}).toArray();
var Productos = [];
for(var i=0;i<producto.length;i++){
	Productos.push(producto[i].model);
}
for(var i=0;i<5000;i++)
{
	
}
db.Ranking.insert({product: , stars: });
