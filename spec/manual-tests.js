"use strict";

const fortuna = require('../index');
const Environment = require('../lib/helpers/environment.helper');

fortuna.auth.token().then((res) => console.log(res));

fortuna.ping.checkHealth()
    .then((res) => console.log(res));