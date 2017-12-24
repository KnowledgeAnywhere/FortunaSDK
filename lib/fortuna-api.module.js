"use strict";
const Promise = require('bluebird');
const r = require('request-promise');

const Environment = require('./environment.helper');
const Auth = require('./auth.module');

const env = Environment.get();

module.exports = class FortunaAPI {
    static get(endpoint) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token,
                            "User-Agent": "FortunaSDK"
                        }
                    };
                    r(req)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((ex) => reject(ex));
                })
                .catch((ex) => console.log(ex));
        });
    }

    static _formatURI(endpoint) {
        return `${env.apiURL}/${endpoint}`;
    }
}