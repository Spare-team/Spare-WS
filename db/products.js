use local;
var products = [
	{model: 'VXFD55', brand: 'SONY', description: 'TV LED 55"', cat: 'Electronics', subcat: 'TV'},
	{model: 'OGT35', brand: 'LG', description: 'TV Plasma 46"', cat: 'Electronics', subcat: 'TV'}
];
for(var i=0; i<products.length;i++){
	db.Products.insert({
		model: products[i].model,
		brand: products[i].brand,
		description: products[i].description,
		cat: products[i].cat,
		subcat: products[i].subcat
	});
}
