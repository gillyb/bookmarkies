
var mongoose = require('mongoose');

// Tags
var tagSchema = new Schema({
	name: String
});
mongoose.model('Tag', tagSchema);

// Bookmarks
var bookmarkSchema = new Schema({
	// TODO: add reference to the user object (how do i use ObjectID here?)
	// TODO: add 'createdDate' property, so we know how to organize these for now!
	userId: Schema.Types.ObjectId,
	url: String,
	title: String,
	description: String,
	tags: [tagSchema] // array of tags
});

bookmarkSchema.path('url').validate(function(value) {
	return value.trim() != '';
});

mongoose.model('Bookmark', bookmarkSchema);
