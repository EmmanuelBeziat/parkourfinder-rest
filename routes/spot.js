/**
 * Module dependencies
 */
const errors = require('restify-errors')
const mongoosePatchUpdate = require('mongoose-patch-update')

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
		spot.save((err) => {
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

			Spot.update({ _id: data._id }, data, (err) => {
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
