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

/**
 * @name Fortuna#User
 * @see {@link module: User}
 * @alias fortuna.user
 */
Fortuna.user = User;

/**
 * @name Fortuna#Users
 * @see {@link module: Users}
 * @alias fortuna.user
 */

Fortuna.users = Users;


module.exports = Fortuna;