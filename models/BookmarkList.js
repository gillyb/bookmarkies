var mongoose = require('mongoose');

var bookmarkListSchema = new mongoose.Schema({

    userId: mongoose.Schema.ObjectId,
    name: String,
    bookmarks: [{
        url: String,
        name: String,
        notes: String, // todo: maybe we shouldn't save the notes in lists
        tags: [String]
    }],
    createdBy: mongoose.Schema.ObjectId,

    created: Date,
    updated: Date
});

// update 'updated' date when saving
bookmarkListSchema.pre('save', function(next) {
    var list = this;
    list.updated = new Date();
    next();
});

module.exports = mongoose.model('BookmarkList', bookmarkListSchema);
