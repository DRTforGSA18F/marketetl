var mongoose = require('mongoose'),
	config = require('./configs/dataSource'),
	loadMarkets = require('./controllers/market'),
	xlsxj = require("xlsx-to-json");

var server = config['market'].database.server,
	port = config['market'].database.port,
	dbName = config['market'].database.name,
	connectionString = "mongodb://" + server + ":" + port + "/" + dbName;

var conn = mongoose.connect(connectionString);

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