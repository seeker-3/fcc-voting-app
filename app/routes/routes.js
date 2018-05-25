'use strict';

var cwd = process.cwd();
var surveyHandler = require(cwd + '/app/controllers/surveyHandler.js');
var userHandler = require(cwd + '/app/controllers/userHandler.js');

module.exports = function (app, passport) {

	app.set('view engine', 'pug');

	app.use(/\/((?!login|auth).)*/, (req, res, next) => {
		if (req.isAuthenticated()) { //logged in?
			return next();
		} else {
			res.redirect('/login');
		}
	});

	app.get('/login', (req, res) => {
		//res.sendFile(cwd + '/client/html/login.html');
		res.render('login');
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});

	app.get('/auth/github', passport.authenticate('github'));

	app.get('/auth/github/callback', passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	app.route('/api/:id')
	 	.get(userHandler.get)
		.post(userHandler.post);

	app.get('/', (req, res) => {
		//res.sendFile(cwd + '/client/html/root.html');
		res.render('root');
	});

	app.get('/create', (req, res) => {
		//res.sendFile(cwd + '/client/html/create.html');
		res.render('create');
	});

	app.route('/survey')
		.get(surveyHandler.get)
		.post(surveyHandler.post)
		.delete(surveyHandler.delete);
};
