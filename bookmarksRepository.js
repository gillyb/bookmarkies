
// Bookmarks Repository

var ObjectId = require('mongoose').Types.ObjectId;

exports = new BookmarksRepository();

function BookmarksRepository() {

	var self = this;

	var _createBookmark = function(bookmark, callback) {
		var newBookmark = new Bookmark({
			// TODO: request the title, and the description as well!
			userId: new ObjectId(userId),
			url: request.body.url,
			tags: newTags
		});
		newBookmark.save(function(err) {
			callback.call(newBookmark, err);
		});
	};

	var _deleteBookmark = function(bookmarkId, userId, callback) {
		var bookmarkToDelete = Bookmark.find({_id:bookmarkId, userId:userId}, function() {
			// TODO: what do i do if i didn't find the bookmarkId ?...
			bookmarkToDelete.remove(function(err, bookmark) {
				callback.call(bookmark, err);
			});
		});	
	};

	var _editBookmark = function(bookmark, callback) {
		bookmark.save(function(err, bookmark) {
			callback.call(bookmark, err);
		});
	};

	return {
		createBookmark: _createBookmark,
		deleteBookmark: _deleteBookmark,
		editBookamrk: _editBookmark
	};

}