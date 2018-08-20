const yamlConfig = require('node-yaml-config')
const db = yamlConfig.load('./db.yaml')

module.exports = {
	name: 'ParkourFinder',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3030,
	base_url: process.env.BASE_URL || 'https://rest.parkoufinder.com',
	medias_url: process.env.MEDIAS_URL || 'https://medias.parkourfinder.com',
	images_path: process.env.IMAGES_PATH || '../medias/',
	db: {
		host: process.env.MONGODB_HOST || db.host,
		port: process.env.MONGODB_URI || db.port,
		base: process.env.MONGODB_BASE || db.base,
		user: process.env.MONGODB_USER || db.user,
		pass: process.env.MONGODB_PASS || db.pass
	}
}
