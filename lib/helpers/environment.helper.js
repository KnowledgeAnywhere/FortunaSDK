"use strict";

require('dotenv').config();

class Environment {
    constructor() {}

    static get url() {
        return process.env.FORTUNA_API_URL || 'https://externalapi.lms.knowledgeanywhere.com';
    }

    static get get() {
        return {
            audience: process.env.FORTUNA_AUDIENCE,
            secret: process.env.FORTUNA_SECRET,
            apiURL: this.url
        }
    }
};


module.exports = Environment;