
$(function() {

	function arrayDistinct(arr) {
		return $.grep(arr, function(v, k){
		    return $.inArray(v, arr) === k;
		});
	};

	var allBookmarkTags = [];

	// TODO: I think i should find a way to make this more efficient - instead of nested loops
	Bookmarkies.Bookmarks.forEach(function(element, i) {
		element.tags.forEach(function(tag, tagIndex) {
			allBookmarkTags.push(tag.name);
		});
	});
	allBookmarkTags = arrayDistinct(allBookmarkTags);

	$('#search-bookmark-tags').typeahead({
		source: allBookmarkTags,
		items: 8,
		minLength: 1,
		updater: addItemToSearchFilter
	});

	function addItemToSearchFilter(item) {	
		var newSearchTag = Bookmarkies.createTagView({name:item});
		$('#search-bookmark-tags-list').append(newSearchTag);

		// filter the bookmarks list
		Bookmarkies.List.addFilter(item);
	}

	// delete tag - remove the tag from the bookmark
	$('body').delegate('#search-bookmark-tags-list .tag .delete-tag', 'click', function() {
		var tag = $(this).parents('.tag');
		Bookmarkies.List.removeFilter(tag.find('.name').html());
		tag.remove();
	});

	// clicking on a tag - show filtered results
	$('body').delegate('.btn-group.tag .btn-primary.name', 'click', function() {
		// TODO: extract this elsewhere (i have this twice in the code!)
		$('.add-bookmark-tab').removeClass('active');
		$('#add-bookmark-form').addClass('hidden');
		$('.search-bookmarks-tab').addClass('active');
		$('#search-bookmarks-form').removeClass('hidden');

		addItemToSearchFilter($(this).html());
	});

});