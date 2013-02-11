
var express = require('express');
app = express();

// configuration
app.configure(function() {
	app.set('env', 'development'); // TODO: this should be defined in process.env.NODE_ENV - don't know where this is though...
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');

	app.use(express.logger());
	app.use(express.compress()); // TODO: check if this takes too much CPU...
	app.use(express.bodyParser());
	app.use(express.cookieParser('my signed cookies'));
	app.use(express.session({secret: 'Bookmarkies are forever!'})); // TODO: think about using connect-mongodb session store instead
	app.use(express.methodOverride());

	// static libraries
	app.use(express.static(__dirname + '/scripts'));
	app.use(express.static(__dirname + '/scripts/3rdParty/bootstrap'));
	app.use(express.static(__dirname + '/css'));
	app.use(express.static(__dirname + '/css/3rdParty/bootstrap'));
	app.use(express.static(__dirname + '/img'));
	app.use(express.static(__dirname + '/img/3rdParty/bootstrap'));

	app.use(app.router);

	// TODO: create filter to authenticate ajax requests (check url's starting with '/-/' for X-Forwarded)
	// TODO: create a minifier & bundler for js/css files
	// TODO: think about adding a timeout middleware... 
	// TODO: add a global error handler
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
require('./models');
Bookmark = mongoose.model('Bookmark');
Tag = mongoose.model('Tag');
User = mongoose.model('User');

// controllers
require('./controllers');


// start listening...
app.listen(8888);
