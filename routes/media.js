/**
 * Module dependencies
 */
const config = require('../config')
const errors = require('restify-errors')
const mongoose = require('mongoose')
const isObjectId = mongoose.Types.ObjectId.isValid
const randomstring = require('randomstring')
const base64ToImage = require('base64-to-image')

/**
 * Models Schema
 */
const Media = require('../models/media')

module.exports = (server) => {
	/**
	 * POST
	 */
	// multer.single('media'),
	server.post('/medias', (req, res, next) => {
		/* if (!req.is('multipart/form-data')) {
			return next(
				new errors.InvalidContentError(`Expects 'multipart/form-data'`)
			)
		} */
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			)
		}

		let data = req.body || {}
		const name = Date.now() + '-' + randomstring.generate({ length: 8, capitalization: 'lowercase' }) + '.' + data.filename.split('.').pop()
		let media = new Media({
			name: name,
			filename: data.filename,
			url: `${config.base_url}/${name}`
		})
		base64ToImage(data.uri, config.images_path, { fileName: name })
		console.log(media)
		media.save((err) => {
			if (err) {
				console.log(err)
				return next(new errors.InternalError(err.message))
				next()
			}

			res.send(201)
			next()
		})
	})

	/**
	 * LIST
	 */
	server.get('/medias', (req, res, next) => {
		Media.apiQuery(req.params, (err, docs) => {
			if (err) {
				return nex(
					new errors.InvalidContentError(err.message)
				)
			}

			res.send(docs)
			next()
		})
	})

	/**
	 * UPDATE
	 */
	server.put('/medias/:medias_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			)
		}

		let data = req.body || {}

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.post_id })
		}

		Media.findOne({ _id: req.params.media_id }, (err, doc) => {
			if (err) {
				return next(
					new errors.InvalidContentError(err.message)
				)
			}
			else if (!doc) {
				return next(
					new errors.ResourceNotFoundError('The resource you requested could not be found')
				)
			}

			Media.update({ _id: data._id }, data, (err) => {
				if (err) {
					return next(
						new errors.InvalidContentError(err.message)
					)
				}

				res.send(200, data)
				next()
			})
		})
	})

	/**
	 * DELETE
	 */
	server.del('/medias/:media_id', (req, res, next) => {
		Media.remove({ _id: req.params.media_id }, (err) => {
			if (err) {
				return next(
					new errors.InvalidContentError(err.message)
				)
			}

			res.send(204)
			next()
		})
	})
}
