"use strict";

require('dotenv').config();

const Promise = require('bluebird');
const r = require('request-promise');
const moment = require('moment');
const Environment = require('./environment.helper');
const Token = require('./token.class');
const LocalStorage = require('node-localstorage').LocalStorage;
const ls = new LocalStorage('./.data');

let env = Environment.get();

/**
 * @module Fortuna#Auth
 * @summary Methods for handling authentication.
 * @description Methods for handling authentication.  Usage of this module may not be needed.   When making calls to the API using other modules in this sdk, authorization is handeled for you.
 * This module is available if you would like to use it to make standard restful calls to the API outside of the SDK.
 */

class Auth {

    /** @method token 
     * @static
     * @async
     * @description Creates a new token from the Fortuna API Authorization server and stores it on disk.     
     * Calling the method will return a promise containing the token.   
     * Subsequent calls will check the freshness of the token and create a new one if needed.
     * @example
     * fortuna.auth.token()
     *              .then((token) => {
     *                    //use token.authorization in a a Authorization header when making a restful API call.      
     *                    })
     *               .catch((ex) => console.log(ex));
     * @returns {Promise<Token>} Promise resolves to a {@link Token}
     * @see {@link Token}
     */

    static token() {
        return new Promise((resolve, reject) => {
            if (ls.getItem('fortunasdk-token')) {
                let _t = new Token(
                    JSON.parse(
                        ls.getItem('fortunasdk-token')
                    )
                );
                if (_t.isValid) {
                    resolve(_t);
                } else {
                    this._createToken()
                        .then((res) => {
                            resolve(new Token(res));
                        })
                        .catch((ex) => {
                            reject(ex);
                        });
                }
            } else {
                this._createToken()
                    .then((res) => {
                        resolve(new Token(res));
                    })
                    .catch((ex) => {
                        reject(ex);
                    });
            }
        });
    }

    static getSingleUseToken() {
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

    static _getAuthEndpoint() {
        return `${env.apiURL}/auth/token`;
    }

    static _createToken() {
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
                .then((res) => {
                    let data = Buffer.from(
                        JSON.stringify(
                            res
                        )
                    );
                    ls.setItem('fortunasdk-token', data);

                })
                .catch((ex) => reject(ex));
        });

    }

};

module.exports = Auth;