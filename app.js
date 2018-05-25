'use strict';

const express = require('express'),
	  mongoose = require('mongoose'),
	  passport = require('passport'),
	  session = require('express-session'),
	  app = express();
const cwd = process.cwd();

require('dotenv').load();

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

require('./app/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/js', express.static(cwd + '/client/js'));
app.use('/css', express.static(cwd + '/client/css'));
app.use('/html', express.static(cwd + '/client/html'));

require('./app/routes/routes.js')(app, passport);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('http://localhost:' + port));
