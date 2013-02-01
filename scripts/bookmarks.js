
$(function() {
	// create bookmark list & render
	Bookmarkies.List = new Bookmarkies.BookmarkList(Bookmarkies.Bookmarks, $('#bookmarks-list'));
	Bookmarkies.List.render();

	$('#bookmark-tags').keyup(function(e) {
		if (e.keyCode == 13) { // enter
			// TODO: add the tag to the list of tags
			var newTagView = Bookmarkies.List.createTagView({name:$.trim($(this).val())});
			$('#new-bookmark-tag-list').append(newTagView);
			$(this).val('');
		}
	});

	$('.bookmark-wrapper').mouseover(function() {
		$(this).find('.delete-bookmark').removeClass('hidden');
	}).mouseout(function() {
		$(this).find('.delete-bookmark').addClass('hidden');
	})

	function getNewBookmarkTags() {
		var newTags = [];
		$('#new-bookmark-tag-list .tag .name').each(function(index, element) {
			newTags.push($(element).html());
		});
		return newTags;
	}

	// bind user events
	$('#add-bookmark').click(function() {
		$.ajax({
			url: '/-/bookmarks/add',
			type: 'post',
			data: {
				title: '',
				url: $('#bookmark-url').val(),
				tags: getNewBookmarkTags()
			},
			error: function(xhr) {
				alert('ok, this is embarassing... :-/');
			},
			success: function(newBookmark) {
				Bookmarkies.List.addBookmark(newBookmark);
				$('#bookmark-url').val('');
				$('#new-bookmark-tag-list').html('');
			}
		})
	});

	$("body").delegate('.delete-bookmark', 'click', function() {
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

	$("body").delegate('.bookmark-wrapper .tag .delete-tag', 'click', function() {
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

	$("body").delegate('#new-bookmark-tag-list .tag .delete-tag', 'click', function() {
		$(this).parents('.tag').remove();
	});
});
