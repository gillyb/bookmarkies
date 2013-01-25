
var authProvider = require('../authenticationProvider');

app.get('/', function(request, response) {

	var isAuthenticated = authProvider.isAuthenticated(request);

	if (isAuthenticated) {
		console.log('== User Authenticated ==');
		// TODO: redirect to the bookmarks list page
	}
	else {
		console.log('==User Not Authenticated ==');
		response.render('homepage');
	}
});