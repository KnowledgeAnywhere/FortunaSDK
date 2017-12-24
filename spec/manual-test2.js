"use strict";

const fortuna = require('../index.js');

//fortuna.auth.getSingleUseToken()
//.then((res) => console.log(res));

fortuna.auth.token()
    .then((res2) => console.log(res2));