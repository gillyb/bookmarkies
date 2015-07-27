//var User = require('../models/User');
//var List = require('../models/List');
//
//var logger = require('../services/logger');
//var utils = require('../services/utils');
//var listsService = require('../services/lists-service');

var express = require('express');
var app = module.exports = express();

app.post('/logged-in', function(req, res) {
    if (!req.user)
        return res.status(401).end();

    return res.end();
});

//app.get('/list/delete/:listId', function(req, res) {
//    if (!req.user || !req.user.admin || req.user.admin !== true) {
//        res.redirect('/');
//        return;
//    }
//
//    List.findOne({ _id: req.params.listId }).exec(function(err, result) {
//        if (err || !result) {
//            res.redirect('/');
//            return;
//        }
//
//        result.remove();
//        res.redirec('/');
//    });
//});
//
//app.get('/list/edit/:listId', function(req, res) {
//    if (!req.user || !req.user.admin || req.user.admin !== true) {
//        res.redirec('/');
//        return;
//    }
//
//    List.findOne({ _id: req.params.listId }).exec(function(err, result) {
//        if (err || !result) {
//            logger.error('Couldnt find list to edit. _id=' + req.params.listId);
//            res.redirect('/');
//            return;
//        }
//
//        // get the user that created this list
//        User.findOne({ _id: result.creator }).exec(function(err, listBy) {
//            if (err || !listBy) {
//                logger.error('Couldnt find the user (' + result.creator + ') that created list (' + req.params.listId + ')');
//            }
//
//            res.render('list/edit', {
//                list: result,
//                listCreator: listBy || {
//                    profile: {
//                        name: 'Anonymous',
//                        picture: ''
//                    }
//                }
//            });
//        });
//    });
//});
//
//app.post('/list/edit/:listId', function(req, res) {
//    // TODO: allow the user that created the list to edit it too!
//    if (!req.user || !req.user.admin || req.user.admin !== true) {
//        res.redirect('/');
//        return;
//    }
//
//    List.findOne({ _id: req.params.listId }).exec(function(err, result) {
//        if (err || !result) {
//            logger.error('Couldnt save list edit. _id=' + req.params.listId);
//            res.redirect('/');
//            return;
//        }
//
//        var reasons = [], reasonCount = 1;
//        while (req.body['reason' + reasonCount] != undefined) {
//            var reasonInput = req.body['reason' + reasonCount];
//            if (reasonInput.trim() != '')
//                reasons.push({ reason: reasonInput });
//            reasonCount++;
//        }
//
//        var updates = {
//            name: req.body.name,
//            description: req.body.description,
//            image: req.body['image-upload'],
//            reasons: reasons
//        };
//
//        List.update({ _id: req.params.listId }, updates, function(err, numAffected) {
//            if (err || numAffected <= 0) {
//                logger.error('Unable to edit list _id=' + req.params.listId);
//                res.redirect('/');
//                return;
//            }
//
//            res.redirect('/');
//        });
//    });
//});
//
//app.get('/list/:id/:slug', function(req, res) {
//    var listId = req.params.id;
//
//    List.findOne({'_id': listId}).exec(function(err, list) {
//        if (err || !list) {
//            res.render('error');
//            return;
//        }
//
//        // create links for the tags
//        var listTags = [];
//        for (var i=0; i<list.tags.length; i++) {
//            listTags.push({
//                name: list.tags[i],
//                link: '/category/' + utils.slugify(list.tags[i])
//            });
//        }
//
//        // get the user that created this list
//        User.findOne({ _id: list.creator }).exec(function(err, listBy) {
//            if (err || !listBy) {
//                logger.error('Couldnt find the user (' + list.creator + ') that created list (' + req.params.listId + ')');
//            }
//
//            res.render('list/view', {
//                title: list.name,
//                list: list,
//                listTags: listTags,
//                listCreator: listBy,
//                categories: listsService.getCategories(),
//                pageLink: 'http://45reasons.com/list/' + listId + '/' + req.params.slug
//            });
//        });
//    });
//});
//
//app.get('/category/:categoryName', function(req,res) {
//    var categoryName = req.params.categoryName;
//    if (!categoryName.match(/^[\w ]+$/)) {
//        logger.error('Trying to reach invalid category (', + categoryName + ')');
//        res.redirect('/');
//        return;
//    }
//
//    List.find({ 'tags': categoryName }).exec(function(err, lists) {
//        if (err) {
//            logger.error('Error occured while fetching categorys lists', err);
//            res.redirect('/');
//            return;
//        }
//
//        res.render('list/category', {
//            category: categoryName,
//            lists: lists,
//            categories: listsService.getCategories(),
//            title: 'Lists tagged under ' + categoryName
//        });
//    });
//
//});
//
//app.get('/create-list', function(req, res) {
//    // TODO: make sure the user is logged in...
//    // req.user is the current User object (or undefined if not logged in)
//
//    var currentUser = req.user || {
//            profile: {
//                name: 'Anonymous',
//                picture: ''
//            }
//        };
//
//    res.render('list/create', {
//        currentUser: currentUser
//    });
//});
//
//app.post('/create-list', function(req, res) {
//
//    // TODO: validations!
//
//    var reasons = [], reasonCount = 1;
//    while (req.body['reason' + reasonCount] != undefined) {
//        var reasonInput = req.body['reason' + reasonCount];
//        if (reasonInput.trim() != '')
//            reasons.push({ reason: reasonInput });
//        reasonCount++;
//    }
//
//    var newList = new List({
//        name: req.body.name,
//        description: req.body.description,
//        amazonLink: req.body.amazonLink,
//        image: req.body['image-upload'],
//        reasons: reasons,
//        created: new Date(),
//        updated: new Date()
//    });
//    newList.save(function(err) {
//        if (err)
//            logger.error('There was an error saving saving the new list', err);
//
//        res.redirect('/');
//    });
//});