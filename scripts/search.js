
$(function() {

	Array.prototype.distinct = function() {
		return $.grep(this, function(v, k){
		    return $.inArray(v ,this) === k;
		});
	};

	var allBookmarkTags = [];

	// TODO: I think i should find a way to make this more efficient - instead of nested loops
	Bookmarkies.Bookmarks.forEach(function(element, i) {
		element.tags.forEach(function(tag, tagIndex) {
			allBookmarkTags.push(tag.name);
		});
	});
	allBookmarkTags.distinct();

	$('#search-bookmark-tags').typeahead({
		source: allBookmarkTags,
		items: 8,
		minLength: 1
	});

});