"use strict";

const fortuna = require('../index');
const Environment = require('../lib/helpers/environment.helper');

fortuna.users.find().then(users => {
    console.log(users);
});