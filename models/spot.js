const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const SpotSchema = new mongoose.Schema(
	{
		slug: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
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
		team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
		description: {
			type: String,
		},
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

const Spot = mongoose.model('Spot', SpotSchema)

module.exports = Spot
