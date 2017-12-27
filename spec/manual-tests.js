"use strict";

const fortuna = require('../index');

fortuna.auth.token()
    .then((token) => console.log(token))
    .catch((ex) => console.log(ex));