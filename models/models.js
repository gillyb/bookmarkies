
var mongoose = require('mongoose');

// Users
var userSchema = new Schema({
	claimedIdentifier: String,
	email: String,
	displayName: String,
	createdDate: Date
	// TODO: fill the user object here
});

// Tags
var tagSchema = new Schema({
	name: String
});
mongoose.model('Tag', tagSchema);

// Bookmarks
var bookmarkSchema = new Schema({
	// TODO: add reference to the user object (how do i use ObjectID here?)
	// TODO: add 'createdDate' property, so we know how to organize these for now!
	url: String,
	title: String,
	description: String,
	tags: [tagSchema] // array of tags
});
mongoose.model('Bookmark', bookmarkSchema);