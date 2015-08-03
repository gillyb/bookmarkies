var Bookmark = require('../models/Bookmark');

var express = require('express');
var app = module.exports = express();

var _ = require('lodash');

app.get('/bookmarks', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    Bookmark.find({ userId: req.user._id }).exec(function(err, result) {
        if (err || !result)
            return res.status(500).end();

        return res.end(JSON.stringify(result));
    });
});

app.put('/bookmark', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    var newBookmark = new Bookmark({
        userId: req.user._id,
        url: req.body.url,
        name: req.body.name,
        notes: req.body.notes,
        tags: req.body.tags,
        created: Date.now(),
        updated: Date.now()
    });
    newBookmark.save(function(err) {
        if (err)
            return res.status(500).end();

        return res.json(newBookmark);
    })
});

app.post('/bookmark/:id', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    Bookmark.findOne({ _id: req.params.id }).exec(function(err, result) {
        if (err)
            return res.status(500).end();

        if (result.userId.id != req.user._id.id)
            return res.status(401).end();

        // copy properties to update bookmark
        result.url = req.body.url;
        result.name = req.body.name;
        result.notes = req.body.notes;
        result.tags = _.pluck(req.body.tags, 'text');

        result.save(function(err) {
            if (err)
                return res.status(500).end();

            return res.json(result);
        });
    });
});

app.delete('/bookmark/:id', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    Bookmark.findOne({ _id: req.params.id }).exec(function(err, result) {
        if (err) {
            return res.status(500).end();
        }

        // TODO: there has to be a nicer way to compare ObjectId objects ?!
        if (result.userId.id != req.user._id.id) {
            return res.status(401).end();
        }

        result.remove(function(err) {
            if (err) {
                return res.status(500).end();
            }
            return res.end();
        });
    });
});