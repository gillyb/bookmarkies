var mongoose = require('mongoose');

var bookmarkSchema = new mongoose.Schema({

  userId: mongoose.Schema.ObjectId,
  url: String,
  name: String,
  notes: String,
  tags: [String],

  created: Date,
  updated: Date
});

// update 'updated' date when saving
bookmarkSchema.pre('save', function(next) {
  var list = this;
  list.updated = new Date();
  next();
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
