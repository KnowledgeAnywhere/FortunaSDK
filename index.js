"use strict";

// Models

const User = require('./lib/models/user.model');
const Token = require('./lib/models/token.model');
const CustomField = require('./lib/models/custom-field.model');

// Modules

const FortunaAPI = require('./lib/modules/fortuna-api.module.js');
const Ping = require('./lib/modules/ping.module');
const Auth = require('./lib/modules/auth.module');
const Users = require('./lib/modules/users.module');

const Fortuna = {};

Fortuna.api = new FortunaAPI();
Fortuna.ping = new Ping();
Fortuna.auth = new Auth();
Fortuna.users = new Users();

// expose Fortuna

module.exports = Fortuna;

// expose models

module.exports.user = User;
module.exports.token = Token;
module.exports.customField = CustomField;