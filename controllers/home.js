var express = require('express');
var app = module.exports = express();

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/logout', function(req, res) {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});