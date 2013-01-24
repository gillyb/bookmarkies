
var crypto = require('crypto');

var _cookieName = 'bAuth';

var _createToken = function(acclaimedIdentifier, timestamp) {
	var token = timestamp + '-' + acclaimedIdentifier;
	var signedToken = crypto.createHash('sha1');
	signedToken.update(token);
	return signedToken.digest('base64');
};

var _createCookie = function(request, response, acclaimedIdentifier) {
	var timestamp = (new Date()).getTime();
	var token = _createToken(acclaimedIdentifier, timestamp);
	console.log('creating authentication cookie for acclaimedIdentifier=' + acclaimedIdentifier + '; token=' + token);
	
	request.session.userToken = token;

	var cookieValue = timestamp + '_' + acclaimedIdentifier;
	response.cookie(_cookieName, cookieValue, {signed:true});
};

var _isAuthenticated = function(request) {
	var cookieValue = request.signedCookies(_cookieName).split('_');
	var acclaimedIdentifier = cookieValue[1];
	var timestamp = cookieValue[0];

	var token = _createToken(acclaimedIdentifier, timestamp);
	console.log('validating user authentication for acclaimedIdentifier=' + acclaimedIdentifier + '; token=' + token);
	return token === request.session.userToken;
};

exports.createCookie = _createCookie;
exports.isAuthenticated = _isAuthenticated;