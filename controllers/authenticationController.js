var openid = require('openid');
var authProvider = require('../authenticationProvider');

var relyingParty = new openid.RelyingParty(
    'http://localhost:8888/login/verify', // Verification URL (yours)
    null, // Realm (optional, specifies realm for OpenID authentication)
    false, // Use stateless verification
    false, // Strict mode
    []); // List of extensions to enable and include

app.get('/login/authenticate', function(request, response) {
	var identifier = request.query.openid_identifier;

	// Resolve identifier, associate, and build authentication URL
	relyingParty.authenticate(identifier, false, function(error, authUrl) 	{
		if (error) {
			// TODO: create a nicer error scenario
			response.writeHead(200);
			response.end('Authentication failed: ' + error.message);
		}
		else if (!authUrl) {
			// TODO: create a better error scenario
			response.writeHead(200);
			response.end('Authentication failed');
		}
		else {
			response.writeHead(302, { Location: authUrl });
			response.end();
		}
	});
});

app.get('/login/verify', function(request, response) {
	// Verify identity assertion
	// NOTE: Passing just the URL is also possible
	relyingParty.verifyAssertion(request, function(error, result) {
		console.log('result from relying party = ' + JSON.stringify(result));

		var claimedIdentifier = result.claimedIdentifier.substring(result.claimedIdentifier.indexOf('id=') + 3);

		// make sure the user was properly authenticated
		if (error || !result.authenticated) {
			// TODO: redirect the user to error page
			response.writeHead(200);
			response.end('There was an error with your authentication... :(');
		}

		// look for existing user
		User.findOne({claimedIdentifier:claimedIdentifier}, function(err, existingUser) {
			console.log(JSON.stringify(existingUser));

			if (!existingUser) {
				// create a new user
				var newUser = new User({
					claimedIdentifier: claimedIdentifier,
					email: '',
					displayName: 'user_' + claimedIdentifier,
					createdDate: new Date()
				});
				newUser.save(function(err) { // TODO: do something upon error
					authProvider.createCookie(request, response, claimedIdentifier);
					response.writeHead(200);
					response.end('A new user was created');
				});
			}
			else {
				// user already exists
				authProvider.createCookie(request, response, claimedIdentifier);
				response.redirect('/');
			}
		});
	});
});

app.get('/logout', function(request, response) {
	authProvider.signout(request, response);
	response.redirect('/');
});