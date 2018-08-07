module.exports = {
	name: 'ParkourFinder',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3030,
	base_url: process.env.BASE_URL || 'http://localhost:3030',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/parkourfinder',
	}
}
