'use strict';

const Promise = require('bluebird');

const LMSAPI = require('./lms-api.module');
const config = require('../config.js');

/** Ping
 * @module Ping
 * @extends LMSAPI
 * @description The ping module is a utility class used to determine service availability.   WARNING:  This module may be deprecated or subject to change.
 * It's primary usage at this stage is for testing.   Documentation will most certainly be dropped beyond the initial full release.
 */

class Ping extends LMSAPI {
  /** checkHealth
   * @description Checks service health.    If a exception is returned then the service may not be available.
   * @example
   * lms.ping.checkHealth()
   *                .then(res => {
   *                  // Server is responding
   *                  })
   *                .catch((ex) => console.log(ex));
   * @returns {Promise<string>} - Promise resolves to a string containing a success message
   */

  checkHealth() {
    return new Promise((resolve, reject) => {
      super
        .get(config.ping.endpoints.checkHealth)
        .then(res => {
          resolve(res);
        })
        .catch(ex => reject(ex));
    });
  }
}

module.exports = Ping;
