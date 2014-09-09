"use strict";

/**
 * Module dependencies
 * First group is Express and its discontents (middle ware)
 * Second group is everything else
 */

var express = require('express');
var favicon = require('serve-favicon');           // Express middleware
var logger = require('morgan');                   // Express middleware
var methodOverride = require('method-override');  // Express middleware
var session = require('express-session');         // Express middleware
var bodyParser = require('body-parser');          // Express middleware
var multer = require('multer');                   // Express middleware
var errorHandler = require('errorhandler');       // Express middleware

var http = require('http');
var routes = require('./routes');
var api = require('./routes/api');
var path = require('path');


var app = module.exports = express();

/**
 * Configuration
 * NOTE: Unlike Express 3.x the ordering of app.use() for middle ware matters
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
app.use(bodyParser.json());                               // parse application/json
app.use(bodyParser.urlencoded({ extended: true }));       // parse application/x-www-form-urlencoded
app.use(multer());                                        // parse multipart/form-data
app.use(express.static(path.join(__dirname, 'public')));


// development only
if (app.get('env') === 'development') {
  app.use(errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Get our package version and put it where a view can show it.
 * Sept 8, 2014, This should be visible in our app, but instead I am re-loading it.
 * Sept 8, 2014, eventually someone will clue me in on how to use what has already been loaded
 */
var pjson = require('./package.json');
app.locals.appname = pjson.name;
app.locals.appver = pjson.version;


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
// Since we want to preform the routing work in Angular, this is all we bother Express with
app.get('*', routes.index);

/**
 * Start Server
 */
var server = http.createServer (app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
   console.log(app.locals.appname + ' server ver ' + app.locals.appver + ' listening on port ' + app.get('port'));
});


// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

