"use strict";

require('dotenv').config();

module.exports = class Environment {
    constructor() {}

    static getURL() {
        if (!process.env.ENVIRONMENT || process.env.NODE_ENV === 'production') { //send production URL
            return 'https://externalapi.knowledgeanywhere.com';
        }
        return 'http://externalapi.lms.knowledgeanywhere.com'; //Send Stage
    }

    static get() {
        return {
            audience: process.env.AUDIENCE,
            secret: process.env.SECRET,
            apiURL: this.getURL()
        }
    }

    static log() {
        console.log('** | Env |**');
        console.log(process.env.AUDIENCE);
        console.log(process.env.SECRET);
        console.log('** | Props |**');
        console.log(this.get());
    }
};