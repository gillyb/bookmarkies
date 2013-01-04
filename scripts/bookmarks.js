
var Bookmarkies = Bookmarkies || {};

Bookmarkies.BookmarkList = function(data, container) {
	// data - array of bokmark objects in json format
	// container - the jQuery element in which to create the list

	var _bookmarks = data; // [ { _id, title, url, tags, description }, {...}, ... ]
	var _scope = container;

	var _createTagView = function(tag) {
		var tagContainer = $('<div/>').addClass('tag').data('tag-id', tag._id);
		tagContainer.append($('<span/>').addClass('delete-tag').html('x'));
		tagContainer.append(tag.name);
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
			$('<div/>').addClass('title').html(bookmark.title)
				.append($('<div/>').addClass('delete-bookmark float-right').html('Delete'))
				.append($('<div/>').addClass('breaker'))
		);
		wrapper.append($('<div/>').addClass('url').html(bookmark.url));
		wrapper.append(tagsContainer);
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
		deleteBookmarkTag: _deleteBookmarkTag
	};

};




$(function() {
	// create bookmark list & render
	Bookmarkies.List = new Bookmarkies.BookmarkList(Bookmarkies.Bookmarks, $('#bookmarks-list'));
	Bookmarkies.List.render();

	// bind user events
	$('#add-bookmark').click(function() {
		$.ajax({
			url: '/-/bookmarks/add',
			type: 'post',
			data: {
				title: '',
				url: $('#bookmark-url').val(),
				tags: $('#bookmark-tags').val()
			},
			error: function(xhr) {
				alert('ok, this is embarassing... :-/');
			},
			success: function(newBookmark) {
				Bookmarkies.List.addBookmark(newBookmark);
			}
		})
	});

	$('.delete-bookmark').click(function() {
		var bookmarkId = $(this).parents('.bookmark-wrapper').data('bookmark-id'); // TODO: extract this to separate method
		$.ajax({
			url: '/-/bookmarks/delete',
			type: 'post',
			data: { bookmarkId: bookmarkId },
			error: function(xhr) {
				alert('ok, this is embarassing');
			},
			success: function() {
				Bookmarkies.List.deleteBookmark(bookmarkId);
			}
		})
	});

	$('.tag .delete-tag').click(function() {
		var tagId = $(this).parents('.tag').data('tag-id');
		var bookmarkId = $(this).parents('.bookmark-wrapper').data('bookmark-id'); // TODO: extract this to separate method
		$.ajax({
			url: '/-/bookmarks/delete-tag',
			type: 'post',
			data: { 
				bookmarkId: bookmarkId,
				tagId: tagId
			},
			error: function(xhr) {
				alert('well, this is embarassing');
			},
			success: function() {
				Bookmarkies.List.deleteBookmarkTag(tagId);
			}
		});
	});
});
