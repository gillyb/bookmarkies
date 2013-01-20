
var express = require('express');
app = express();

// configuration
app.configure(function() {
	app.set('env', 'development'); // TODO: this should be defined in process.env.NODE_ENV - don't know where this is though...
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');

	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/scripts'));
	app.use(express.static(__dirname + '/css'));
	app.use(app.router);

	// TODO: create filter to authenticate ajax requests (check url's starting with '/-/' for X-Forwarded)
	// TODO: create a minifier & bundler for js/css files
	// TODO: think about adding a timeout middleware... 
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookmarkies');
Schema = mongoose.Schema;
ObjectId = mongoose.ObjectId;

// models
require('./models/models.js');
Bookmark = mongoose.model('Bookmark');
Tag = mongoose.model('Tag');

// controllers
require('./controllers/controllers.js');
require('./controllers/authenticationController.js');


// start listening...
app.listen(8888);
