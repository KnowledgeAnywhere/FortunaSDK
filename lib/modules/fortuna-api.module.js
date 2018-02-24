"use strict";
const Promise = require('bluebird');
const r = require('request-promise');

const Environment = require('../helpers/environment.helper');
const Auth = require('./auth.module');

const env = Environment.get;
const config = require('../config.js');


/** FortunaAPI
 * @description.   This module is available for use and is used by all other modules to call the API in a consistent way and handles authentication.    Use the methods to manually make a request to the API.
 */

class FortunaAPI {
    constructor() {

    }
    /** get
     * @description Performs a GET request.
     * @param {string} endpoint to be called.
     * @returns {Promise<Object>} JSON payload returned from the API
     */

    get(endpoint) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": config.global.userAgent
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

    /** post
     * @description Performs a POST request.
     * @param {string} endpoint to be called.
     * @param {object} JSON data to be sent to the server
     * @returns {Promise<Object>} JSON payload returned from the API
     */
    post(endpoint, data) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        method: 'POST',
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": config.global.userAgent
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

    /** put
     * @description Performs a PUT request.   You can also send in a blank object and append a path param to the endpoint.
     * @param {string} endpoint to be called.
     * @param {object} JSON data to be sent to the server
     * @returns {Promise<Object>} JSON payload returned from the API
     */

    put(endpoint, data) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        method: 'PUT',
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": config.global.userAgent
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

    /** delete
     * @description Performs a DELETE request.
     * @param {string} endpoint to be called.   Should include the path params or a query string with the resource you intend to delete.
     * @returns {Promise<Object>} JSON payload returned from the API
     * @example
     * fortuna.$.delete('api/posts/delete/123456');
     */
    delete(endpoint, data) {
        return new Promise((resolve, reject) => {
            Auth.token()
                .then((token) => {
                    let req = {
                        method: 'DELETE',
                        uri: this._formatURI(endpoint),
                        json: true,
                        headers: {
                            "Authorization": token.authorization,
                            "User-Agent": config.global.userAgent
                        },
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


    _formatURI(endpoint) {
        return `${env.apiURL}/${endpoint}`;
    }

    /** Exception handler.
     * @description Exceptions from the API are piped to this method.   In the future this will support a formal logger function.
     * @param ex - Exception
     * @private
     *
     */

    _handleEx(ex) {
        console.log(ex);
        return;
    }

    _serialize(obj, prefix) {
        let str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }
}

module.exports = FortunaAPI;