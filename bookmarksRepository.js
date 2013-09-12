
// Bookmarks Repository

var ObjectId = require('mongoose').Types.ObjectId;

var _getBookmarks = function(userId, callback) {
	var bookmarks = Bookmark.find({userId:userId}, function(err, data) {	 
		console.log(data);
		callback(data, err);
	});
};

var _createBookmark = function(bookmark, callback) {
	var newBookmark = new Bookmark({
		// TODO: request the title, and the description as well!
		userId: new ObjectId(userId),
		url: request.body.url,
		tags: newTags
	});
	newBookmark.save(function(err) {
		callback(newBookmark, err);
	});
};

var _deleteBookmark = function(bookmarkId, userId, callback) {
	var bookmarkToDelete = Bookmark.find({_id:bookmarkId, userId:userId}, function() {
		// TODO: what do i do if i didn't find the bookmarkId ?...
		bookmarkToDelete.remove(function(err, bookmark) {
			callback(bookmark, err);
		});
	});	
};

var _editBookmark = function(bookmark, callback) {
	bookmark.save(function(err, bookmark) {
		callback(bookmark, err);
	});
};

exports.getBookmarks = _getBookmarks;
exports.createBookmark = _createBookmark;
exports.deleteBookmark = _deleteBookmark;
exports.editBookmark = _editBookmark;