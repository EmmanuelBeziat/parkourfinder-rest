/**
 * Module dependencies
 */
const errors = require('restify-errors')
const multer = require('multer')
const mongoose = require('mongoose')
const isObjectId = mongoose.Types.ObjectId.isValid

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../../uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, new Date.now() + '_' + file.originalname)
	}
})
const fileFilter = (req, file, cb) => {
	if (!file.mimetype === 'image/jpeg' || !file.mimetype === 'image/gif') {
		cb(new Error('Not allowed file'), false)
	}
	cb(null, true)
}
const limits = () => { }
const upload = multer({ storage, limits, fileFilter })

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
		if (!req.is('multipart/form-data')) {
			return next(
				new errors.InvalidContentError(`Expects 'multipart/form-data'`)
			)
		}

		let data = req.body || {}
		let media = new Media(data)

		media.save((err) => {
			if (err) {
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
	 * GET
	 **
	/¨
	server.get('/medias/:media_url', (req, res, next) => {
		Media.findOne({ _id: req.params.media_url }, (err, doc) => {
			if (err) {
				return next(
					new errors.InvalidContentError(err.message)
				)
			}

			res.send(doc)
			next()
		})
	})
	*/

	server.get('/medias/:id', (req, res, next) => {
		const promise = isObjectId(req.params.id)
			? Team.findOne({ _id: req.params.id })
			: Team.findOne({ filename: req.params.id })
		promise.then(team => res.send(team)).catch(next)
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
