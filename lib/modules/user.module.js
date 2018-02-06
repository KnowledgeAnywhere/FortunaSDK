"use strict";

const Fortuna = require('./fortuna-api.module');
const config = require('../../config.js');

/**
 * @module User
 * @memberof Fortuna
 * @alias fortuna.user
 * @extends Fortuna
 * @description The user module is a utility class used to determine service availability.   WARNING:  This module may be deprecated or subject to change.
 * It's primary usage at this stage is for testing.   Documentation will most certainly be dropped beyond the initial full release.
 */

class User extends Fortuna {

    /**
     * @method findById
     * @static
     * @async
     * @description Finds a single user by externalId.   Resolves to a promise containing the user.   If a user is not found with the specified externalId a 404 will be returned in the catch block.
     * @param externalId - externalId of the user to be looked up.
     * @example
     * fortuna.user.findById()
     *                .then((res) => console.log(user))
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<User>} - Promise resolves to a object containing the user.
     */

    static findById(externalId) {
        return new Promise((resolve, reject) => {
            super.get(`${config.user.endpoints.resource}/${externalId}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }

    /**
     * @method create
     * @static
     * @async
     * @description Finds a single user by externalId.   Resolves to a promise containing the user.   If a user is not found with the specified externalId a 404 will be returned in the catch block.
     * @param user {object<User>} - externalId of the user to be looked up.
     * @example
     * fortuna.user.findById()
     *                .then((res) => console.log(user))
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<User>} - Promise resolves to a object containing the user.
     */

    static create(user) {
        return new Promise((resolve, reject) => {
            super.get(`${config.user.endpoints.resource}/${externalId}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }
}

module.exports = User;