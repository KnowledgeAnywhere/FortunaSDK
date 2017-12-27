"use strict";

const FortunaAPI = require('./fortuna-api.module');

/**
 * @module Ping
 * @memberof! Fortuna#
 * @description - The ping module is a utility class used to determine service availability.   WARNING:  This module may be deprecated or subject to change.
 * It's primary usage at this stage is for testing.   Documentation will most certainly be dropped beyond the initial full release.
 */

class Ping extends FortunaAPI {

    /**
     * @method checkHealth
     * @static
     * @async
     * @description Checks service health.    If a exception is returned then the service may not be available.
     * @example
     * fortuna.ping.checkHealth()
     *                .then((res) => console.log(res))
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<string>} - Promise resolves to a string containing a success message
     */

    static checkHealth() {
        return new Promise((resolve, reject) => {
            let endpoint = "ping/authorized";
            super.get(endpoint)
                .then((res) => {
                    resolve(res);
                })
                .catch((ex) => reject(ex));
        });

    }
};

module.exports = Ping;