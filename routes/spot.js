/**
 * Module dependencies
 */
const config = require('../config')
const errors = require('restify-errors')
const randomstring = require('randomstring')
const sharp = require('sharp')

/**
 * Models Schema
 */
const Spot = require('../models/spot')

module.exports = (server) => {
	/**
	 * POST
	 */
	server.post('/spots', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError(`Expects 'application/json'`)
			)
		}

		let data = req.body || {}
		let spot = new Spot(data)

		const hasNewPictures = data.newMedias

		let picturesURL = []
		let picturesURI = []

		if (hasNewPictures) {
			data.newMedias.forEach(picture => {
				const date = Date.now()
				const random = randomstring.generate({ length: 8, capitalization: 'lowercase' })
				const ext = picture.filename.split('.').pop()
				const filename = `${date}-${random}.${ext}`

				picturesURI.push({ filename: filename, uri: picture.uri })
				picturesURL.push(`${config.medias_url}/${filename}`)
			})
		}

		spot.save((err) => {
			if (err) {
				return next(new errors.InternalError(err.message))
				next()
			}

			if (hasNewPictures) {
				picturesURI.forEach(picture => {
					let base64Image = picture.uri.split(';base64,').pop()

					const imgBuffer = Buffer.from(base64Image, 'base64')
					sharp(imgBuffer)
						.resize(1920, null)
						.toFile(`${config.images_path}/${picture.filename}`)
						.catch(err => console.log(`downisze issue ${err}`))

					sharp(imgBuffer)
						.resize(320, null)
						.toFile(`${config.images_path}/min/${picture.filename}`)
						.catch(err => console.log(`downisze min issue ${err}`))
				})
			}

			res.send(201)
			next()
		})
	})

	/**
	 * LIST
	 */
	server.get('/spots', (req, res, next) => {
		Spot.apiQuery(req.params, (err, docs) => {
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
	 */
	server.get('/spots/:slug', (req, res, next) => {
		Spot.findOne({ slug: req.params.slug }, (err, doc) => {
			if (err) {
				return next(
					new errors.InvalidContentError(err.message)
				)
			}

			res.send(doc)
			next()
		})
	})

	/**
	 * UPDATE
	 */
	server.put('/spots/:spot_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			)
		}

		let data = req.body || {}

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.spot_id })
		}

		const hasNewPictures = data.newMedias

		let picturesURL = []
		let picturesURI = []

		if (hasNewPictures) {
			data.newMedias.forEach(picture => {
				const date = Date.now()
				const random = randomstring.generate({ length: 8, capitalization: 'lowercase' })
				const ext = picture.filename.split('.').pop()
				const filename = `${date}-${random}.${ext}`

				picturesURI.push({ filename: filename, uri: picture.uri })
				picturesURL.push(`${config.medias_url}/${filename}`)
			})
		}

		Spot.findOne({ _id: req.params.spot_id }, (err, doc) => {
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

			if (hasNewPictures) {
				picturesURL.forEach(url => data.medias.push(url))
			}

			Spot.update({ _id: data._id }, data, (err) => {
				if (err) {
					return next(
						new errors.InvalidContentError(err.message)
					)
				}

				if (hasNewPictures) {
					picturesURI.forEach(picture => {
						let base64Image = picture.uri.split(';base64,').pop()

						const imgBuffer = Buffer.from(base64Image, 'base64')
						sharp(imgBuffer)
							.resize(1920, null)
							.toFile(`${config.images_path}/${picture.filename}`)
							.catch(err => console.log(`downisze issue ${err}`))

						sharp(imgBuffer)
							.resize(320, null)
							.toFile(`${config.images_path}/min/${picture.filename}`)
							.catch(err => console.log(`downisze min issue ${err}`))
					})
				}

				res.send(200, data)
				next()
			})
		})
	})

	/**
	 * DELETE
	 */
	server.del('/spots/:spot_id', (req, res, next) => {
		Spot.remove({ _id: req.params.spot_id }, (err) => {
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
