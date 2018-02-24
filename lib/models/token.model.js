"use strict";

const moment = require('moment');

/** Token
 * @typedef {Token}
 * @param {object} token - Response from auth server to serialize into a Token.
 * @property {string} accessToken  - Access Token, used to make requests.
 * @property {date} issued  - Issue date
 * @property {date} expires  - Expiry date
 * @property {number} expiresIn  - Seconds till expiration.   Epcoch Unix Timestamp
 * @property {string} tokenType  - Type of token.    (Bearer)
 * @property {string} authorization  - Authorization header content.    Example `Bearer xxxxxxxxx`
 * @property {boolean} isValid  - Checks to see if the token is "fresh"  or expired
 */

class Token {

    constructor(token) {
        this.accessToken = token.access_token;
        this.issued = token[".issued"];
        this.expires = token[".expires"];
        this.expiresIn = this._expiresIn();
        this.tokenType = token.token_type;
        this.authorization = this._authorization();
        this.isValid = this._isValid();
        this.audience = token.audience;
    }

    /** Retreives the token
     * @returns {object} token - Token object
     */

    get() {
        return this;
    }

    /** Checks to see if a token has expired.
     * @private
     * @returns {bool} - True if token is still valid
     */

    _isValid() {
        return moment(this.expires).isAfter();
    }

    /** Computes number of seconds until token expires
     * @private
     * @returns {int} - Seconds until expiration
     */

    _expiresIn() {
        return moment(this.expires).unix() - moment().unix();
    }

    /** Formats the standard `Authorization` header needed to make a request
     * @private
     * @returns {string} - Authorization header in the form of `Bearer xxxxxxxxx`
     */

    _authorization() {
        return `Bearer ${this.accessToken}`;
    }
};

module.exports = Token;