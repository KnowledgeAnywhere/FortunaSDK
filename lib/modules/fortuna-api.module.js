"use strict";
const Promise = require('bluebird');
const r = require('request-promise');

const Environment = require('../helpers/environment.helper');
const Auth = require('./auth.module');

const env = Environment.get;
const config = require('../../config');

/** @module $
 * @memberof Fortuna
 * @description The $ module contains methods needed by the child classes to effectivley call the API in a repeatable manner.
 */

class FortunaAPI {

    /**
     * @method get
     * @static
     * @description Performs a GET request.
     * @param {string} endpoint to be called.
     * @returns {Promise<object>} JSON payload returned from the API
     */

    static get(endpoint) {
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
                    console.log(req.uri);
                    r(req)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((ex) => reject(ex));
                })
                .catch((ex) => this._handleEx(ex));
        });
    }

    /**
     * @method post
     * @static
     * @description Performs a POST request.
     * @param {string} endpoint to be called.
     * @param {object} JSON data to be sent to the server
     * @returns {Promise<object>} JSON payload returned from the API
     */
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

    /**
     * @method put
     * @static
     * @description Performs a PUT request.   You can also send in a blank object and append a path param to the endpoint.
     * @param {string} endpoint to be called.
     * @param {object} JSON data to be sent to the server
     * @returns {Promise<object>} JSON payload returned from the API
     */

    static put(endpoint, data) {
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

    /**
     * @method delete
     * @static
     * @description Performs a DELETE request.
     * @param {string} endpoint to be called.   Should include the path params or a query string with the resource you intend to delete.
     * @returns {Promise<object>} JSON payload returned from the API
     * @example
     * fortuna.$.delete('api/posts/delete/123456');
     */
    static delete(endpoint, data) {
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


    static _formatURI(endpoint) {
        return `${env.apiURL}/${endpoint}`;
    }

    /** Exception handler.
     * @description Exceptions from the API are piped to this method.   In the future this will support a formal logger function.
     * @param ex
     *
     */

    static _handleEx(ex) {
        console.log(ex);
        return;
    }
}

module.exports = FortunaAPI;