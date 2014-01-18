
/*
 * GET home page.
 */

exports.index = function(request, response){
	var	log = (typeof request.session.user === 'undefined') ? false : true ;

  	response.render('index', { title: 'Buy Some Shit App', is_log : log });
};
