const cwd = process.cwd();
const Survey = require(cwd + '/app/models/survey');

function addPercents(items) {
	var sum = [].reduce.call(items, (acc, item) => acc + item.votes, 0);
	for (let item of items) {
		item.percent = item.percent = sum
			? Math.round(item.votes / sum * 100)
			: 0;
	}
}

function genArray(body) {
	var arr = [];
	for (let key in body) {
		if (key === 'title') continue;
		arr.push({
			item: key,
			votes: 0,
		});
	}
	return arr;
}

function updateSurvey(query, res) {
	Survey.findOne({'title': query.title})
		.update(
			{'items.item': query.item},
			{'$inc': {'items.$.votes': 1}}
		).exec(err => {
			if (err) throw err;
			res.end();
		});
}

var getAll = function(req, res) {
	Survey.find()
		.exec((err, surveys) => {
			if (err) throw err;
			res.send(surveys.map(survey => survey.title));
		});
}

var getOne = function (req, res) {
	Survey.findOne({title: req.query.survey})
		.exec((err, survey) => {
			if (err) throw err;
			addPercents(survey.items);
			res.render('survey', {
				title: survey.title,
				items: survey.items
			});
		});
}

module.exports.get = function(req, res) {
	if (req.query.survey === 'all') getAll(req, res);
	else getOne(req, res);
	//else res.sendFile(cwd + '/client/html/survey.html');
};

module.exports.post = function(req, res) {
	if (req.query.update) return updateSurvey(req.query, res);
	new Survey({
		title: req.body.title,
		items: genArray(req.body),
	}).save(err => {if (err) throw err;});
	res.redirect('/');
};

module.exports.delete = function(req, res) {
	res.end();
};
