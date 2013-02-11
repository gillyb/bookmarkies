
var mongoose = require('mongoose');

// Users
var userSchema = new Schema({
	claimedIdentifier: String,
	email: String,
	displayName: String,
	createdDate: Date
	// TODO: fill the user object here
});
mongoose.model('User', userSchema);
