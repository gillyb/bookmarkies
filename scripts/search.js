
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
		minLength: 1
	});

});