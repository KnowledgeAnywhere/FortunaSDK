const FortunaAPI = require('./lib/modules/fortuna-api.module.js');
const Ping = require('./lib/modules/ping.module');
const Auth = require('./lib/modules/auth.module');
const User = require('./lib/modules/user.module');
const Users = require('./lib/modules/users.module');

/**
 * @namespace {object} Fortuna
 * @description Top-Level namespace for the Fortuna SDK.
 */

const Fortuna = {};

// Undocumented Module
Fortuna.$ = FortunaAPI;

Fortuna.ping = Ping;
Fortuna.auth = Auth;
Fortuna.user = User;
Fortuna.users = Users;
module.exports = Fortuna;