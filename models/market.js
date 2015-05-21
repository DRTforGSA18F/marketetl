var mongoose = require('mongoose');

var location = mongoose.Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: [Number]
}, {
	_id: false
});

var market = new mongoose.Schema({
	_id: String,
	name: String,
	website: String,

	street: String,
	city: String,
	county: String,
	state: String,
	zip: String,

	season1Date: String,
	season1Time: String,
	season2Date: String,
	season2Time: String,
	season3Date: String,
	season3Time: String,
	season4Date: String,
	season4Time: String,

	credit: String,
	WIC: String,
	WICcash: String,
	SFMNP: String,
	SNAP: String,

	bakedgoods: String,
	cheese: String,
	crafts: String,
	flowers: String,
	eggs: String,
	seafood: String,
	herbs: String,
	vegetables: String,
	honey: String,
	jams: String,
	maple: String,
	meat: String,
	nursery: String,
	nuts: String,
	plants: String,
	poultry: String,
	prepared: String,
	soap: String,
	trees: String,
	wine: String,

	updateTime: String,

	Location: [location]
});

market.index({
	'Location': '2dsphere'
})

module.exports = market;