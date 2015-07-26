var express = require('express');
var app = module.exports = express();

app.get('/', function(req, res) {

  res.render('home');

  //var amount = 10;
  //var page = req.query.page || 1;
  //var skip = amount * (page-1);
  //
  //List.find()
  //    .sort('-updated')
  //    .skip(skip)
  //    .limit(amount)
  //    .exec(function(err, lists) {
  //      for (var i=0; i<lists.length; i++) {
  //        lists[i].link = '/list/' + lists[i]._id +'/' + utils.slugify(lists[i].name);
  //        lists[i].img = lists[i].img || '/img/default_thumbnail.png';
  //        lists[i].reasons = lists[i].reasons.slice(0, 2);
  //      }
  //
  //      res.render('home', {
  //        title: 'Home',
  //        newLists: lists,
  //        categories: listsService.getCategories(),
  //        isAdmin: req.user && req.user.admin == true,
  //        currentPage: page
  //      });
  //    });
});