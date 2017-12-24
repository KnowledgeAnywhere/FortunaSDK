const FortunaAPI = require('./lib/fortuna-api.module.js');
const Ping = require('./lib/ping.module');
const Auth = require('./lib/auth.module');

/** Fortuna API SDK by Knowledge Anywhere
 *
 */


module.exports = {
    _: FortunaAPI,
    ping: Ping,
    auth: Auth
};