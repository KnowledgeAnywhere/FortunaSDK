"use strict";

const FortunaAPI = require('./fortuna-api.module');

/** Ping Module.
 * @module ping
 * @extends FortunaAPI
 * @namespace fortuna.ping
 */

module.exports = class Ping extends FortunaAPI {

    /**
     * Checks service health.
     * @function checkHealth
     * @example <caption>Example usage </caption>
     * fortuna.ping.checkHealth()
     * @returns {promise} - Promise resolves to a string containing a success message
     * @throws Error message indicating service may be experiencing an interruption
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