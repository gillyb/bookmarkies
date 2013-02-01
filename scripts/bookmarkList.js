
var Bookmarkies = Bookmarkies || {};

Bookmarkies.BookmarkList = function(data, container) {
	// data - array of bokmark objects in json format
	// container - the jQuery element in which to create the list

	var _bookmarks = data; // [ { _id, title, url, tags, description }, {...}, ... ]
	var _scope = container;

	var _createTagView = function(tag) {
		var tagContainer = $('<div/>').addClass('btn-group tag').data('tag-id', tag._id || '');
		tagContainer.append($('<a/>').addClass('btn btn-primary name').append(tag.name));
		var deleteTagButton = $('<a/>').addClass('btn btn-primary delete-tag')
			.append($('<span/>').append($('<i/>').addClass('icon-remove')));
		tagContainer.append(deleteTagButton);
		return tagContainer;
	};

	var _createBookmarkView = function(bookmark) {
		var tagsContainer = $('<div/>').addClass('tags');
		if (bookmark.tags) {
			$.each(bookmark.tags, function(index, element) {
				tagsContainer.append(_createTagView(element));
			});
		}
		var wrapper = $('<div/>').addClass('bookmark-wrapper').data('bookmark-id', bookmark._id);
		wrapper.append(
				$('<div/>').addClass('url-wrapper')
					.append($('<div/>').addClass('url float').html(bookmark.url))
					.append($('<div/>').addClass('delete-bookmark float hidden').html('Delete'))
					.append($('<div/>').addClass('breaker'))
			)
			.append(tagsContainer);
		return wrapper;
	};

	var _render = function() {
		// TODO: convert this code to use some html template engine like Mustache (or jQuery templates)
		container.html('');
		$.each(_bookmarks, function(index, element) {
			var row = _createBookmarkView(element);
			container.append(row);
		});
	};

	var _addBookmark = function(newBookmark) {
		_bookmarks.push(newBookmark);
		var row = _createBookmarkView(newBookmark);
		container.prepend(row);
	};

	var _deleteBookmark = function(bookmarkId) {
		// this only deletes the bookmark from the UI - counting on the
		// fact that the bookmark was deleted from mongodb - but this should
		// be changed to actually persist the bookmarks list state.
		var bookmarks = $('.bookmark-wrapper');
		$.each(bookmarks, function(index, element) {
			if ($(element).data('bookmark-id') == bookmarkId) {
				$(element).hide();
			}
		});
	};

	var _deleteBookmarkTag = function(tagId) {
		// TODO: this code is TOO similar to the code in _deleteBookmark,
		// 		 so I need to try to combine these two methods!
		var tags = $('.bookmark-wrapper .tag');
		$.each(tags, function(index, element) {
			if ($(element).data('tag-id') == tagId) {
				$(element).hide();
			}
		});
	};

	return {
		render: _render,
		addBookmark: _addBookmark,
		deleteBookmark: _deleteBookmark,
		deleteBookmarkTag: _deleteBookmarkTag,
		createTagView: _createTagView
	};

};