const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const mongooseUrlSlugs = require('mongoose-url-slugs')
const timestamps = require('mongoose-timestamp')

const SpotSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			lat: {
				type: String,
				required: true,
				trim: true,
			},
			lng: {
				type: String,
				required: true,
				trim: true,
			},
			country: {
				type: String,
				required: true,
				trim: true,
			},
			city: {
				type: String,
				required: true,
				trim: true,
			},
			complementary: {
				type: String,
				required: false,
				trim: true
			}
		},
		team: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Team'
		}],
		description: {
			type: String,
			trim: true
		},
		medias: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Media',
			validate: [arrayLimit, '{PATH} exceeds the limit of 4']
		}],
		status: {
			type: String,
			required: true,
			enum: ['published', 'pending', 'hidden'],
			default: 'published'
		}
	},
	{
		minimize: false
	}
)

function arrayLimit (value) {
	return value.length <= 4
}

SpotSchema.plugin(timestamps)
SpotSchema.plugin(mongooseStringQuery)
SpotSchema.plugin(mongooseUrlSlugs('location.city title'))

const Spot = mongoose.model('Spot', SpotSchema)

module.exports = Spot
