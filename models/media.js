const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
// const mongooseUrlSlugs = require('mongoose-url-slugs')
const timestamps = require('mongoose-timestamp')

const MediaSchema = new mongoose.Schema(
	{
		filename: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		filetype: {
			type: String,
			enum: ['picture', 'video'],
			default: 'picture',
			required: true
		},
		url: {
			type: String,
			required: true
		},
	},
	{
		minimize: false
	}
)

MediaSchema.plugin(timestamps)
MediaSchema.plugin(mongooseStringQuery)

const Media = mongoose.model('Media', MediaSchema)

module.exports = Media
