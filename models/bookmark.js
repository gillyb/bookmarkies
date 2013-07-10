
var mongoose = require('mongoose');

// Tags
var tagSchema = new Schema({
	name: String
});
mongoose.model('Tag', tagSchema);


// Bookmarks
var bookmarkSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true
	},
	url: {
		type: String,
		required: true
	},
	title: String,
	description: String,
	createdDate: {
		type: Date,
		default: Date.now
	},
	updatedDate: {
		type: Date,
		default: Date.now
	},
	tags: [tagSchema] // array of tags
});

bookmarkSchema.path('url').validate(function(value) {
	return value.trim() != '';
});
bookmarkSchema.pre('save', function(next) {
	this.updatedDate = new Date();
	next();
});

mongoose.model('Bookmark', bookmarkSchema);
