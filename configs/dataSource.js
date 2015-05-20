var config = {

	"market": {
		"sourceDirectory": "C:/data/extract/market/",
		"excel": "2013 Geographric Coordinate Spreadsheet for U S  Farmers Markets 8'3'1013.xlsx",
		"files": {
			"market": "farmersmarket.json"
		},
		"database": {
			"server": "127.0.0.1",
			"port": "27017",
			"name": "MarketTest"
		}
	}
}

module.exports = config;