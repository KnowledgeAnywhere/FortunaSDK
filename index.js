const FortunaAPI = require('./lib/modules/fortuna-api.module.js');
const Ping = require('./lib/modules/ping.module');
const Auth = require('./lib/modules/auth.module');

/** @namespace {object} Fortuna */

/**
 * @description Top-Level namespace for the Fortuna SDK.
 */

const Fortuna = {};

Fortuna.$ = FortunaAPI;
Fortuna.ping = Ping;
Fortuna.auth = Auth;


module.exports = Fortuna;