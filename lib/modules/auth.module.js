"use strict";

require('dotenv').config();

const Promise = require('bluebird');
const request = require('request-promise');
const moment = require('moment');
const Environment = require('../helpers/environment.helper');
const Token = require('../models/token.model');
const LocalStorage = require('node-localstorage').LocalStorage;
const ls = new LocalStorage('./.data');

const config = require('../../config.js');
const env = Environment.get;

/** Auth
 * @summary Methods for handling authentication.
 * @description Methods for handling authentication.  Usage of this module may not be needed.   When making calls to the API using other modules in this sdk, authorization is handeled for you.
 * This module is available if you would like to use it to make standard restful calls to the API outside of the SDK.
 */

class Auth {

    /** token
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

    token() {
        return Promise.resolve(this._token());
    }



    async _token() {
        if (ls.getItem('fortunasdk-token')) {
            let _t = new Token(
                JSON.parse(
                    Buffer.from(ls.getItem('fortunasdk-token'), 'base64').toString()
                )
            );
            if (_t.isValid) {

                return _t;
            } else {
                let res = await this._createToken();
                return new Token(res);
            }
        } else {

            let res = await this._createToken();
            return new Token(res);

        }
    }

    getSingleUseToken() {
        return new Promise((resolve, reject) => {
            let req = {
                method: 'POST',
                uri: this._getAuthEndpoint(),
                json: true,
                headers: {
                    'User-Agent': config.global.userAgent,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    client_id: env.audience,
                    client_secret: env.secret,
                    grant_type: 'client_credentials'
                }
            };
            request(req)
                .then((token) => {
                    resolve(`Bearer ${token.access_token}`);
                })
                .catch((ex) => reject(ex));
        });
    }

    /** @method _createToken
     * @private
     * @description Private function that creates a token
     */

    async _createToken() {
        let req = {
            method: 'POST',
            uri: this._getAuthEndpoint(),
            json: true,
            headers: {
                'User-Agent': config.global.userAgent,
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                client_id: env.audience,
                client_secret: env.secret,
                grant_type: 'client_credentials'
            }
        };
        const res = await request(req);
        let data = Buffer.from(
            JSON.stringify(
                res
            )
        ).toString('base64');
        ls.setItem('fortunasdk-token', data);

        return res;

    }

    _getAuthEndpoint() {
        return `${env.apiURL}/${config.auth.endpoints.token}`;
    }

}

module.exports = Auth;