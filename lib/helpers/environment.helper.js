'use strict';

require('dotenv').config();

const p = process.env;

class Environment {
    constructor() {}

    static get url() {
        return process.env.LMS_API_URL || 'https://externalapi.lms.knowledgeanywhere.com';
    }

    static get get() {
        return {
            audience: p.LMS_AUDIENCE,
            secret: p.LMS_SECRET,
            apiURL: this.url
        };
    }
}

module.exports = Environment;
