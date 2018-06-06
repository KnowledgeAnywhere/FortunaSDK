'use strict';

// Models

const User = require('./lib/models/user.model');
const Token = require('./lib/models/token.model');
const CustomField = require('./lib/models/custom-field.model');

// Modules

const LMSAPI = require('./lib/modules/lms-api.module.js');
const Ping = require('./lib/modules/ping.module');
const Auth = require('./lib/modules/auth.module');
const Users = require('./lib/modules/users.module');

const LMS = {};

LMS.api = new LMSAPI();
LMS.ping = new Ping();
LMS.auth = new Auth();
LMS.users = new Users();

// expose LMS

module.exports = LMS;

// expose models

module.exports.user = User;
module.exports.token = Token;
module.exports.customField = CustomField;
