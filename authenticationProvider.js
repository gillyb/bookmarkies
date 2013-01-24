
var crypto = require('crypto');

var _cookieName = 'bAuth';

var _createToken = function(claimedIdentifier, timestamp) {
	var token = timestamp + '-' + claimedIdentifier;
	var signedToken = crypto.createHash('sha1');
	signedToken.update(token);
	return signedToken.digest('base64');
};

var _createCookie = function(request, response, claimedIdentifier) {
	var timestamp = (new Date()).getTime();
	var token = _createToken(claimedIdentifier, timestamp);
	console.log('creating authentication cookie for claimedIdentifier=' + claimedIdentifier + '; token=' + token);
	
	request.session.userToken = token;

	var cookieValue = timestamp + '__bmies__' + claimedIdentifier;
	response.cookie(_cookieName, cookieValue, {signed:true});
};

var _isAuthenticated = function(request) {
	var authCookie = request.signedCookies[_cookieName];
	if (!authCookie)
		return false;

	var cookieValue = authCookie.split('__bmies__');
	var claimedIdentifier = cookieValue[1];
	var timestamp = cookieValue[0];

	var token = _createToken(claimedIdentifier, timestamp);
	console.log('validating user authentication for claimedIdentifier=' + claimedIdentifier + '; token=' + token);
	return token === request.session.userToken;
};

exports.createCookie = _createCookie;
exports.isAuthenticated = _isAuthenticated;