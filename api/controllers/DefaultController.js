'use strict'

const Controller = require('trails-controller')

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/controllers}
 * @this TrailsApp
 */
module.exports = class DefaultController extends Controller {

  /**
   * Hash a string with a slow hashing algorithm
   */
  hash (request, reply) {
    // call the hash service
    const input = request.payload.input
    this.app.log.info(`Hash input: ${input}`)
    this.app.services.DefaultService.hash(input)
      .then(hash => {
        this.app.log.info(`Hash output: ${hash}`)
      })

    // not waiting for the response because it is slow,
    // the result will be visible in the server logs
    reply()
  }

  /**
   * Return some info about this application
   */
  info (request, reply) {
    reply(this.app.services.DefaultService.getApplicationInfo())
  }
}
