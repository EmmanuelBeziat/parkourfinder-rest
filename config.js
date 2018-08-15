module.exports = {
	name: 'ParkourFinder',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3030,
	base_url: process.env.BASE_URL || 'https://rest.parkoufinder.com',
	medias_url: process.env.MEDIAS_URL || 'https://medias.parkourfinder.com',
	images_path: process.env.IMAGES_PATH || '../medias/',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://163.172.49.220:27017/parkourfinder',
	}
}
