'use strict'

const Service = require('trails-service')
const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION || 'us-east-1'
const lambda = new AWS.Lambda

/**
 * @module DefaultService
 *
 * @description Default Service included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/services}
 * @this TrailsApp
 */
module.exports = class DefaultService extends Service {

  hash(input) {
    const params = {
      FunctionName: 'slowhash',
      LogType: 'Tail',
      Payload: JSON.stringify({ input })
    }

    return new Promise((resolve, reject) => {
      this.app.log.info('calling lambda slowhash function')
      lambda.invoke(params, (err, res) => {
        if (err) return reject(err)
        const applicationLogs = new Buffer(res.LogResult, 'base64').toString()
        this.app.log.info(`application logs returned from lambda: ${applicationLogs}`)
        resolve(res.Payload)
      })
    })
  }

  /**
   * Return some info about this application
   */
  getApplicationInfo() {
    const trailpacks = []
    Object.keys(this.app.packs).forEach(packName => {
      if (packName != 'inspect') {
        const pack = this.app.packs[packName]
        trailpacks.push({
          name: pack.name,
          version: pack.pkg.version
        })
      }
    })
    return {
      app: this.app.pkg.version,
      node: process.version,
      libs: process.versions,
      trailpacks: trailpacks
    }
  }
}
