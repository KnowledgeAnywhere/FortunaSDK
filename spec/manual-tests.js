"use strict";

const Environment = require('../lib/environment.module');
const Auth = require('../lib/auth.module');
const Fortuna = require('../lib/fortuna-api.class');
const Ping = require('../lib/ping.module');

Fortuna.get("ping")
    .then((res) => {
        console.log(res);
    }).catch((ex) => console.log(ex));

Ping.checkHealth()
    .then((res) => {
        console.log(res);
    })
    .catch((ex) => console.log(ex));