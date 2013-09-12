
$(function() {

	$('.add-bookmark-tab').click(function() {
		$(this).addClass('selected');
		$('.search-bookmarks-tab').removeClass('selected');
		$('#search-bookmark-area').hide();
		$('#add-bookmark-area').show();
	});

	$('.search-bookmarks-tab').click(function() {
		$(this).addClass('selected');
		$('.add-bookmark-tab').removeClass('selected');
		$('#search-bookmark-area').show();
		$('#add-bookmark-area').hide();
	});

});
