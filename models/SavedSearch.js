var mongoose = require('mongoose');

var savedSearchSchema = new mongoose.Schema({

    userId: mongoose.Schema.ObjectId,
    name: String,
    filters: [String],

    created: Date,
    updated: Date
});

// update 'updated' date when saving
savedSearchSchema.pre('save', function(next) {
    var list = this;
    list.updated = new Date();
    next();
});

module.exports = mongoose.model('SavedSearch', savedSearchSchema);
