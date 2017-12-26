"use strict";
const Promise = require('bluebird');
const r = require('request-promise');

const Environment = require('./environment.helper');
const Auth = require('./auth.module');

const env = Environment.get();

/** @module $
 * @private
 * @description The $ module contains methods needed by the child classes to effectivley call the API.
 */

class Fortuna {

    static get(endpoint) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": "FortunaSDK@alpha"
                        }
                    };
                    r(req)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((ex) => reject(ex));
                })
                .catch((ex) => this._handleEx(ex));
        });
    }

    static post(endpoint, data) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        method: 'POST',
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": "FortunaSDK@alpha"
                        },
                        data: data
                    };
                    r(req)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((ex) => reject(ex));
                })
                .catch((ex) => this._handleEx(ex));
        });
    }

    static put(endpoint, data) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        method: 'put',
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": "FortunaSDK@alpha"
                        },
                        data: data
                    };
                    r(req)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((ex) => reject(ex));
                })
                .catch((ex) => this._handleEx(ex));
        });
    }

    static _formatURI(endpoint) {
        return `${env.apiURL}/${endpoint}`;
    }

    static _handleEx(ex) {
        console.log(ex);
        return;
    }
}

module.exports = Fortuna;