const FortunaAPI = require('./lib/fortuna-api.module.js');
const Ping = require('./lib/ping.module');
const Auth = require('./lib/auth.module');

/** @namespace fortuna */

/**
 * @description Top-Level namespace for the Fortuna SDK.
 */


module.exports = {
    $: FortunaAPI,
    ping: Ping,
    auth: Auth
};