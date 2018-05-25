const cwd = process.cwd();
const User = require(cwd + '/app/models/users');

module.exports.get = function (req, res) {
  res.json({
    github: req.user.github,
    votes: req.user.votes,
    surveys: req.user.surveys
  });
}


module.exports.post = function (req, res) {
  User.findOne({'github.id': req.user.github.id})
    .update(
      {$push: {[req.query.post]: req.query.title}},
    )
    .exec((err, user) => {
			if (err) throw err;
			res.end();
		});
}
