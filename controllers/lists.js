var BookmarkList = require('../models/BookmarkList');

var express = require('express');
var app = module.exports = express();

var _ = require('lodash');

//app.get('/search/all', function(req, res) {
//    if (!req.user)
//        return res.status(401).end();
//
//    SavedSearch.find({ userId: req.user._id }).exec(function(err, result) {
//        if (err || !result)
//            return res.status(500).end();
//
//        return res.end(JSON.stringify(result));
//    });
//});
//
//app.post('/search/save', function(req, res) {
//    if (!req.user)
//        return res.status(401).end();
//
//    var savedSearch = new SavedSearch({
//        userId: req.user._id,
//        name: req.body.name,
//        filters: req.body.filters,
//        created: Date.now()
//    });
//    savedSearch.save(function(err) {
//        if (err)
//            return res.status(500).end();
//
//        return res.json(savedSearch);
//    })
//});
//
//app.delete('/search/:id', function(req, res) {
//    if (!req.user)
//        return res.status(401).end();
//
//    SavedSearch.findOne({ _id: req.params.id }).exec(function(err, result) {
//        if (err)
//            return res.status(500).end();
//
//        // make sure this saved search belongs to the user deleting it
//        if (result.userId.id != req.user._id.id)
//            return res.status(401).end();
//
//        result.remove(function(err) {
//            if (err)
//                return res.status(500).end();
//
//            return res.end();
//        })
//    });
//});