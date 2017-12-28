const FortunaAPI = require('./lib/modules/fortuna-api.module.js');
const Ping = require('./lib/modules/ping.module');
const Auth = require('./lib/modules/auth.module');

/**
 * @namespace {object} Fortuna
 * @description Top-Level namespace for the Fortuna SDK.
 */

const Fortuna = {};

// Undocumented Module
Fortuna.$ = FortunaAPI;

/**
 * @name Fortuna#Ping
 * @see Ping
 * @alias fortuna.ping
 */
Fortuna.ping = Ping;

/**
 * @name Fortuna#Auth
 * @see {@link module: Auth}
 * @alias fortuna.auth
 */
Fortuna.auth = Auth;


module.exports = Fortuna;