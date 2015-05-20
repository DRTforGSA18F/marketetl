var mongoose = require('mongoose'),
	config = require('./configs/dataSource'),
	loadMarkets = require('./controllers/market'),
	uriUtil = require('mongodb-uri'),
	xlsxj = require("xlsx-to-json");

var server = config['market'].database.server,
	port = config['market'].database.port,
	dbName = config['market'].database.name,
	connectionString = "mongodb://" + server + ":" + port + "/" + dbName;

var mongodbUri = 'mongodb://drtuser:Go*4@ds031942.mongolab.com:31942/farmersmarkets';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

var conn = mongoose.connect(mongooseUri);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', function callback() {
/*
	xlsxj({
		input: config['market'].sourceDirectory + config['market'].excel,
		output: config['market'].sourceDirectory + 'farmersmarket.json'
	}, function(err, result) {
		if (err) {
			console.error(err);
		} else {
			console.log('Completed conversion from Excel to JSON');
*/
			mongoose.connection.db.dropDatabase();
			console.log('Starting data processing...');

			loadMarkets(conn, function(){
				console.log('Done');
				process.exit(0);
			});
/*		}
	});
*/
});