
var ObjectId = require('mongoose').Types.ObjectId;
var authProvider = require('../authenticationProvider');

app.get('/bookmarkies', function(request, response) {
	var userId = authProvider.validateAuthentication(request, response);
	console.log('==='+userId);
	Bookmark.find({userId:userId}, function(error, data) { 
		if (error)
			// TODO: display some nice error message
			console.log(error);
		else {
			console.log(data);
			response.render('bookmarkies2', { Bookmarks: data });
		}
	});
});

app.post('/-/bookmarks/add', function(request, response) {
	// add the new bookmark to the db
	// request.body - All the sent parameters will be in request.body.<param_name> thanks to express.bodyParser() middleware!
	// request params : title, url, description, tags (now tags is just a string delimited by commas - TODO: fix this!)

	// TODO: do some validation on the bookmark data
	
	var userId = authProvider.validateAuthentication(request, response);

	var newTags = [];
	for (var tagIndex in splitTags = request.body.tags) {
		var newTag = { name: splitTags[tagIndex] };
		newTags.push(newTag);
	}

	console.log(newTags);

	var newBookmark = new Bookmark({
		// TODO: request the title, and the description as well!
		userId: new ObjectId(userId),
		url: request.body.url,
		tags: newTags
	});
	newBookmark.save(function(err) { }); // TODO: do something on error...

	// return the new bookmarks id to the user
	response.json(newBookmark);
});

app.post('/-/bookmarks/delete', function(request, response) {
	// request.body.bookmarkId - the bookmark to delete
	// TODO: delete all the tags as well

	var userId = authProvider.validateAuthentication(request, response);

	var bookmarkId = request.body.bookmarkId;
	console.log('request to delete bookmark : ' + bookmarkId);
	var bookmarkToDelete = Bookmark.find({_id:bookmarkId, userId:userId}, function() {
		// TODO: what do i do if i didn't find the bookmarkId ?...
		bookmarkToDelete.remove();
		response.json({_id:bookmarkId});
	});
});

app.post('/-/bookmarks/delete-tag', function(request, response) {
	// TODO: this method is WAY TOO similar to '/-/bookmarks/delete' - try to combine these!
	var bookmarkId = request.body.bookmarkId;
	var tagId = request.body.tagId;
	console.log('request to delete tag : ' + tagId + '; bookmarkId : ' + bookmarkId);

	var userId = authProvider.validateAuthentication(request, response);

	Bookmark.findOne({_id:bookmarkId, userId:userId}, function(err, bookmark) {
		// if (err) handleError(); // TODO: do something with this error, and return a valid response...
		bookmark.tags.id(tagId).remove();
		bookmark.save(function(err) {
			// if (err) handleError(); // TODO: do something with this error, and return a valid response...
			console.log('tag deleted : ' + tagId);
			response.json({_id:tagId});
		});
	});
});

// TODO: add an 'add tag' action (or maybe an update action that will cover this)