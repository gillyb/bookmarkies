
var Bookmarkies = Bookmarkies || {};

Bookmarkies.BookmarkList = function(data, container) {
	// data - array of bokmark objects in json format
	// container - the jQuery element in which to create the list

	var _bookmarks = data; // [ { _id, title, url, tags, description }, {...}, ... ]
	var _scope = container;
	var _filter = []; // this is an array of tag filters for the search form

	var _createBookmarkView = function(bookmark) {
		var tagsContainer = $('<div/>').addClass('tags');
		if (bookmark.tags) {
			$.each(bookmark.tags, function(index, element) {
				tagsContainer.append(Bookmarkies.createTagView(element));
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

	var _insertEmptyListMessage = function() {
		var emptyListMessage = $('<div/>')
			.addClass('empty-bookmark-list-message')
			.html('You have no bookmarks yet... :(');
		container.append(emptyListMessage);
	};
	var _removeEmptyListMessage = function() {
		container.find($('.empty-bookmark-list-message')).remove();
	};

	var _render = function() {
		// TODO: convert this code to use some html template engine like Mustache (or jQuery templates)
		container.html('');

		if (_bookmarks.length == 0) {
			_insertEmptyListMessage();
			return;
		}

		$.each(_bookmarks, function(index, element) {
			var row = _createBookmarkView(element);
			container.append(row);
		});
	};

	var _addBookmark = function(newBookmark) {
		_removeEmptyListMessage();
		$('.empty-bookmark-list-message').remove();
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
				_bookmarks.splice(_bookmarks.indexOf($(element).find('.name')), 1);
				$(element).hide();
			}
		});

		if (_bookmarks.length == 0)
			_insertEmptyListMessage();
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

	var _search = function() {
		_scope.find('.bookmark-wrapper').each(function(i, element) {
			if (_filter.length == 0) {
				$(element).show();
				return;
			}

			var tagsList = [];
			$(element).find('.tags a.name').each(function(tagI, tagElement) { tagsList.push($(tagElement).html()); });

			var hasMatchingTags = true;
			_filter.forEach(function(filterTag) {
				if ($.inArray(filterTag, tagsList) == -1)
					hasMatchingTags = false;
			});

			if (!hasMatchingTags)
				$(this).hide();
			else 
				$(this).show();
		});
	};

	var _addFilter = function(searchTag) {
		_filter.push(searchTag);
		_search();
	};
	var _removeFilter = function(searchTag) {
		if (_filter.indexOf(searchTag) > -1)
			_filter.splice(_filter.indexOf(searchTag), 1);
		_search();
	};
	var _clearFilter = function() {
		_filter = [];
		_search();
	};

	return {
		render: _render,
		addBookmark: _addBookmark,
		deleteBookmark: _deleteBookmark,
		deleteBookmarkTag: _deleteBookmarkTag,
		addFilter: _addFilter,
		removeFilter: _removeFilter,
		clearFilter: _clearFilter,
		filter: _search
	};

};

Bookmarkies.createTagView = function(tag) {
	var tagContainer = $('<div/>').addClass('btn-group tag').data('tag-id', tag._id || '');
	tagContainer.append($('<a/>').addClass('btn btn-primary name').append(tag.name));
	var deleteTagButton = $('<a/>').addClass('btn btn-primary delete-tag')
		.append($('<span/>').append($('<i/>').addClass('icon-remove')));
	tagContainer.append(deleteTagButton);
	return tagContainer;
};