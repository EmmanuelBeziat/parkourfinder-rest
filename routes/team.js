/**
 * Module dependencies
 */
const errors = require('restify-errors')

/**
 * Models Schema
 */
const Team = require('../models/team')

module.exports = (server) => {
	/**
	 * POST
	 */
	server.post('/teams', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError(`Expects 'application/json'`)
			)
		}

		let data = req.body || {}

		let team = new Team(data)
		team.save((err) => {
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
	server.get('/teams', (req, res, next) => {
		Team.apiQuery(req.params, (err, docs) => {
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
	server.get('/teams/:team_id', (req, res, next) => {
		Team.findOne({ _id: req.params.team_id }, (err, doc) => {
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
	server.put('/teams/:teams_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			)
		}

		let data = req.body || {}

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.post_id })
		}

		Team.findOne({ _id: req.params.team_id }, (err, doc) => {
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

			Team.update({ _id: data._id }, data, (err) => {
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
	server.del('/teams/:team_id', (req, res, next) => {
		Team.remove({ _id: req.params.team_id }, (err) => {
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
