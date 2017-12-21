"use strict";
require('dotenv').config();

const Promise = require('bluebird');
const r = require('request-promise');
const moment = require('moment');
const Environment = require('./environment.module');

let env = Environment.get();

module.exports = class Auth {
    static _validate() {
        if (!this.token) {
            return false;
        } else {
            return moment(this.token[".expires"]).isAfter();
        }
    }

    static _getAuthEndpoint() {
        return `${env.apiURL}/auth/token`;
    }

    static token() {
        return new Promise((resolve, reject) => {
            let req = {
                method: 'POST',
                uri: this._getAuthEndpoint(),
                json: true,
                headers: {
                    'User-Agent': 'FortunaSDK',
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    client_id: env.audience,
                    client_secret: env.secret,
                    grant_type: 'client_credentials'
                }
            };
            r(req)
                .then((token) => {
                    resolve(`Bearer ${token.access_token}`);
                })
                .catch((ex) => reject(ex));
        });

    }
};