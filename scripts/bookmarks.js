
$(function() {
	// create bookmark list & render
	Bookmarkies.List = new Bookmarkies.BookmarkList(Bookmarkies.Bookmarks, $('#bookmarks-list'));
	Bookmarkies.List.render();

	$('#bookmark-tags').keyup(function(e) {
		if (e.keyCode == 13) { // 'Enter' key
			var newTagView = Bookmarkies.createTagView({name:$.trim($(this).val())});
			$('#new-bookmark-tag-list').append(newTagView);
			$(this).val('');
		}
	});

	$('body').delegate('.bookmark-wrapper', 'mouseover', function() {
		$(this).find('.delete-bookmark').removeClass('hidden');
	}).delegate('.bookmark-wrapper', 'mouseout', function() {
		$(this).find('.delete-bookmark').addClass('hidden');
	});

	$('.add-bookmark-tab').click(function() {
		$('.search-bookmarks-tab').removeClass('active');
		$(this).addClass('active');
		$('#search-bookmarks-form').addClass('hidden');
		$('#add-bookmark-form').removeClass('hidden');
	});
	$('.search-bookmarks-tab').click(function() {
		$('.add-bookmark-tab').removeClass('active');
		$(this).addClass('active');
		$('#add-bookmark-form').addClass('hidden');
		$('#search-bookmarks-form').removeClass('hidden');
	});

	function getNewBookmarkTags() {
		var newTags = [];
		$('#new-bookmark-tag-list .tag .name').each(function(index, element) {
			newTags.push($(element).html());
		});
		return newTags;
	}

	// bind user events
	$('#add-bookmark').click(function() {
		if ($.trim($('#bookmark-url').val()) == '') {
			$('#bookmark-url').parents('.control-group').addClass('error');
			alert('You must enter a url');
		}

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
				$('#bookmark-url').val('').focus();
				$('#new-bookmark-tag-list').html('');
			}
		})
	});

	// delete bookmark
	$('body').delegate('.delete-bookmark', 'click', function() {
		if (!confirm('Are you sure you want to delete this bookmark ?'))
			return;

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

	// delete tag
	$('body').delegate('.bookmark-wrapper .tag .delete-tag', 'click', function() {
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

	$('body').delegate('#new-bookmark-tag-list .tag .delete-tag', 'click', function() {
		$(this).parents('.tag').remove();
	});

	// click on bookmark
	$('body').delegate('.bookmark-wrapper .url-wrapper .url', 'click', function() {
		window.open($(this).html(), '_blank');
	});
});
