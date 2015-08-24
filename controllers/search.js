var SavedSearch = require('../models/SavedSearch');

var express = require('express');
var app = module.exports = express();

var _ = require('lodash');

app.post('/search/save', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    var savedSearch = new SavedSearch({
        userId: req.user._id,
        name: req.body.name,
        filters: req.body.filters,
        created: Date.now()
    });
    savedSearch.save(function(err) {
        if (err)
            return res.status(500).end();

        return res.json(savedSearch);
    })
});