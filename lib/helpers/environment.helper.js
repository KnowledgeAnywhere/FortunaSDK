'use strict';

require('dotenv').config();

const p = process.env;

class Environment {
    constructor() {}

    static get url() {
        return process.env.FORTUNA_API_URL || 'https://externalapi.lms.knowledgeanywhere.com';
    }

    static get get() {
        return {
            audience: p.FORTUNA_AUDIENCE,
            secret: p.FORTUNA_SECRET,
            apiURL: this.url
        };
    }
}

module.exports = Environment;
