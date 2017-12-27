"use strict";

require('dotenv').config();

class Environment {
    constructor() {}

    static getURL() {
        if (!process.env.ENVIRONMENT || process.env.NODE_ENV === 'production') { //send production URL
            return 'https://externalapi.knowledgeanywhere.com';
        }
        return 'http://externalapi.lms.knowledgeanywhere.com'; //Send Stage
    }

    static get() {
        return {
            audience: process.env.FORTUNA_AUDIENCE,
            secret: process.env.FORTUNA_SECRET,
            apiURL: this.getURL()
        }
    }
};


module.exports = Environment;