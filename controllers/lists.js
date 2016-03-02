var BookmarkList = require('../models/BookmarkList');
var Bookmark = require('../models/Bookmark');

var express = require('express');
var app = module.exports = express();

var _ = require('lodash');

app.get('/lists', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    BookmarkList.find({ userId: req.user._id }).exec(function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end(err);
        }

        return res.json(results);
    });
});

app.post('/list', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    var newBookmarkList = new BookmarkList({
        userId: req.user._id,
        name: req.body.name,
        created: Date.now(),
        updated: Date.now()
    });
    newBookmarkList.save(function(err) {
        if (err)
            return res.status(500).end();

        return res.json(newBookmarkList);
    });
});

app.post('/list/:id/add-bookmark', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    BookmarkList.findOne({ _id: req.params.id }).exec(function(err, listResult) {
        if (err || !listResult)
            return res.status(500).end();

        if (listResult.userId.id != req.user._id.id)
            return res.status(401).end();

        // todo: make this call parallel to the previous call!
        Bookmark.findOne({ _id: req.body.bookmarkId }).exec(function(err, bookmarkResult) {
            if (err || !bookmarkResult)
                return res.status(500).end();

            listResult.bookmarks.push({
                url: bookmarkResult.url,
                name: bookmarkResult.name,
                tags: bookmarkResult.tags
            });

            listResult.save(function(err) {
                if (err)
                    return res.status(500).end();

                return res.end();
            });
        });

        return res.end(JSON.stringify(result));
    });
});