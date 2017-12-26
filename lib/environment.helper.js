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

    static log() {
        console.log('** | Env |**');
        console.log(process.env.FORTUNA_AUDIENCE);
        console.log(process.env.FORTUNA_SECRET);
        console.log('** | Props |**');
        console.log(this.get());
    }
};


module.exports = Environment;