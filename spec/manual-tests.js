"use strict";

const fortuna = require('../index');

Fortuna.get("ping")
    .then((res) => {
        console.log(res);
    }).catch((ex) => console.log(ex));

Ping.checkHealth()
    .then((res) => {
        console.log(res);
    })
    .catch((ex) => console.log(ex));