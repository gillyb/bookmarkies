
var _cookieName = 'bAuth';

var _createToken = function(userId) {
	var timestamp = (new Date()).getTime();
	return timestamp + '-' + userId;
};

var _createCookie = function(request, response, userId) {
	var token = _createToken(userId);
	console.log('creating authentication cookie for user='+userId+'; token='+token);
	request.session.userToken = token;
	response.cookie(_cookieName, token, {signed:true});
};

var _isAuthenticated = function(request) {
	var token = request.signedCookies(_cookieName);
	console.log('validating user authentication for token='+token);
	return token === request.session.userToken;
};

exports.createCookie = _createCookie;
exports.isAuthenticated = _isAuthenticated;