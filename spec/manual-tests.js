"use strict";

const fortuna = require('../index');
const Environment = require('../lib/helpers/environment.helper');

var token = fortuna.auth.token().then((res) => console.log(res));