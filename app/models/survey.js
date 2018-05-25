
const mongoose = require('mongoose');
const {Schema} = mongoose;

module.exports = mongoose.model('surveys', new Schema({
	title: String,
	items: Array,
	createdBy: String,
}));