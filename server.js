var mongoose = require('mongoose'),
	config = require('./configs/dataSource'),
	loadMarkets = require('./controllers/market');

var server = config['market'].database.server,
	port = config['market'].database.port,
	dbName = config['market'].database.name,
	connectionString = "mongodb://" + server + ":" + port + "/" + dbName;

var conn = mongoose.connect(connectionString);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', function callback() {
	
	mongoose.connection.db.dropDatabase();
	console.log("Starting data processing...");

	loadMarkets(conn);

});
