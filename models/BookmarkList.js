var mongoose = require('mongoose');

var bookmarkListSchema = new mongoose.Schema({

    userId: mongoose.Schema.ObjectId,
    name: String,
    bookmarkIds: [mongoose.Schema.ObjectId],
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
