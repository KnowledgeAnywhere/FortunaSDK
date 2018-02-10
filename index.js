const FortunaAPI = require('./lib/modules/fortuna-api.module.js');
const Ping = require('./lib/modules/ping.module');
const Auth = require('./lib/modules/auth.module');
const User = require('./lib/modules/user.module');

const Fortuna = {};

Fortuna.api = FortunaAPI;
Fortuna.ping = Ping;
Fortuna.auth = Auth;
Fortuna.user = User;
module.exports = Fortuna;