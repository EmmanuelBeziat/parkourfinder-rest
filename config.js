module.exports = {
	name: 'ParkourFinder',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3030,
	base_url: process.env.BASE_URL || 'http://localhost:3030',
	images_path: process.env.IMAGES_PATH || '../images/',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://163.172.49.220:27017/parkourfinder',
	}
}
