
var mongoose = require('mongoose');

// Users
var userSchema = new Schema({
	claimedIdentifier: {
		type: String,
		required: true
	},
	email: String,
	displayName: String,
	createdDate: {
		type: Date,
		default: Date.now
	},
	updatedDate: {
		type: Date,
		default: Date.now
	}
});

userSchema.pre('save', function(next) {
	this.updatedDate = new Date();
	next();
});

mongoose.model('User', userSchema);
