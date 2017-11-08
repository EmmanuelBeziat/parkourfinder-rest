const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const TeamSchema = new mongoose.Schema(
	{
		slug: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
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

TeamSchema.plugin(timestamps)
TeamSchema.plugin(mongooseStringQuery)

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team
