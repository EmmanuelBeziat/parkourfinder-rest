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
			}
		},
		team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
		description: {
			type: String,
		},
		medias: [{
			type: mongoose.Schema.Types.ObjectId, ref: 'Media'
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

SpotSchema.plugin(timestamps)
SpotSchema.plugin(mongooseStringQuery)
SpotSchema.plugin(mongooseUrlSlugs('location.city title'))

const Spot = mongoose.model('Spot', SpotSchema)

module.exports = Spot
