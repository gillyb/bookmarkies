
$(function() {
	// create bookmark list & render
	Bookmarkies.List = new Bookmarkies.BookmarkList(Bookmarkies.Bookmarks, $('#bookmarks-list'));
	Bookmarkies.List.render();

	$('#bookmark-tags').keyup(function(e) {
		if (e.keyCode == 13) { // enter
			// TODO: add the tag to the list of tags
			var newTagView = Bookmarkies.List.createTagView({name:$.trim($(this).val())});
			$('#new-bookmark-tag-list').append(newTagView);
		}
	});

	$('.bookmark-wrapper').mouseover(function() {
		$(this).find('.delete-bookmark').removeClass('hidden');
	}).mouseout(function() {
		$(this).find('.delete-bookmark').addClass('hidden');
	})


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
