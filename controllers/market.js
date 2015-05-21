var market = require("../models/market"),
	config = require('../configs/dataSource'),
	fs = require('fs'),
	mongoose = require('mongoose');

function loadMarkets(conn) {

	console.log("Reading... " + config['market'].sourceDirectory + config['market'].files.market);

	var marketModel = conn.model('market', market, 'markets'),
		sourceFileName = config['market'].sourceDirectory + config['market'].files.market,
		marketDataList;

	fs.readFile(sourceFileName, 'utf8', function(err, data) {
		if (err) throw err;
		var marketDataList = JSON.parse(data);

		for (var key in marketDataList) {
			var item = marketDataList[key];

			var marketDocument = new marketModel({
				_id: item.FMID.toString(),
				name: item.MarketName.toString(),

				website: item.Website.toString(),

				street: item.street.toString(),
				city: item.city.toString(),
				county: item.County.toString(),
				state: item.State.toString(),
				zip: item.zip.toString(),

				season1Date: item.Season1Date.toString(),
				season1Time: item.Season1Time.toString(),
				season2Date: item.Season2Date.toString(),
				season2Time: item.Season2Time.toString(),
				season3Date: item.Season3Date.toString(),
				season3Time: item.Season3Time.toString(),
				season4Date: item.Season4Date.toString(),
				season4Time: item.Season4Time.toString(),

				credit: item.Credit.toString(),
				WIC: item.WIC.toString(),
				WICcash: item.WICcash.toString(),
				SFMNP: item.SFMNP.toString(),
				SNAP: item.SNAP.toString(),

				bakedgoods: item.Bakedgoods.toString(),
				cheese: item.Cheese.toString(),
				crafts: item.Crafts.toString(),
				flowers: item.Flowers.toString(),
				eggs: item.Eggs.toString(),
				seafood: item.Seafood.toString(),
				herbs: item.Herbs.toString(),
				vegetables: item.Vegetables.toString(),
				honey: item.Honey.toString(),
				jams: item.Jams.toString(),
				maple: item.Maple.toString(),
				meat: item.Meat.toString(),
				nursery: item.Nursery.toString(),
				nuts: item.Nuts.toString(),
				plants: item.Plants.toString(),
				poultry: item.Poultry.toString(),
				prepared: item.Prepared.toString(),
				soap: item.Soap.toString(),
				trees: item.Trees.toString(),
				wine: item.Wine.toString(),

				updateTime: item.updateTime.toString(),
				
				Location : [{
					"type": "Point",
					"coordinates": [(item.x.toString() !== "") ? parseFloat(item.x.toString()) : 0, (item.x.toString() !== "") ? parseFloat(item.y.toString()) : 0]
				}]

			});

			marketDocument.save(function(err) {
				if (err) {
					console.log(err);
					process.exit(1);
				} else {
					console.log('loaded ' + this.emitted.complete[0]._id);
				}
			});
		}

	});

};

module.exports = loadMarkets;