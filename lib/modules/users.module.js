"use strict";
const Promise = require('bluebird');

const FortunaAPI = require('./fortuna-api.module');
const config = require('../config.js');

/** Users
 * @module Users
 * @extends FortunaAPI
 * @description The users module contains functions related to creating, reading, updating and deactivating users.
 */

class Users extends FortunaAPI {

    constructor() {
        super();
    }

    /** Search for users.   Returns 1000 users at a time.   Use the `offset` parameter to loop through the LMS's entire record set.
     * @param {Object} searchParams - Object containing search parameters.   See properties.
     * @property {string} startdate - Filter users by the date they were created.  Should be a unix timestamp (ms) .   Optional.   Defaults to 0 (midnight 1970, UTC)
     * @property {string} enddate - Filter users by the date they were created.  Should be a unix timestamp (ms) .   Optional.   Defaults to the current  UTC time. (same as calling `new Date().getTime()`)
     * @property {string[]} externalIds -   Filters users by their `externalId`
     * @property {int} offset - num of records to offset.     Returns the first 1000 records of the collection by default (`offset: 0`).   A offset of 1000 (`offset: 1000`) will return the next 1000 records.
     * @returns {Promise<User[]>} - Resolves to a promise containing an array of users.
     */
    find(searchParams) {
        return new Promise((resolve, reject) => {
            let params = super._serialize(searchParams)
            super.get(config.users.endpoints.resource + params)
                .then(users => {
                    resolve(users);
                })
                .catch((ex) => reject(ex));
        });

    }

    /** findById
     * @description Finds a single user by externalId.   Resolves to a promise containing the user.   If a user is not found with the specified externalId a 404 will be returned in the catch block.
     * @param {string} externalId - externalId of the user to be looked up.
     * @example
     * fortuna.user.findById()
     *                .then((res) => console.log(user))
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<User>} - Promise resolves to a object containing the user.
     */

    findById(externalId) {
        return new Promise((resolve, reject) => {
            super.get(`${config.user.endpoints.resource}/${externalId}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }

    /**
     * create
     * @description Creates a new user.
     * @param {object<User>} user - User object to create.  @see {@link User}
     * @example
     * fortuna.user.create(user)
     *             .then(res => {
     *                  // {
     *                  //  message: "USER_PROVISION_SUCCESS",
     *                  //  hasWarnings: false,
     *                  //  warnings: []
     *                  // }
     *              })
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<Object>} - Promise resolves to a object.    The warnings array will contain additional info about invalid data.
     */

    create(user) {
        return new Promise((resolve, reject) => {
            super.post(`${config.user.endpoints.resource}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }

    /** update
     * @description Update a user. Partial updates are allowed and only the fields passed in will be updated.  Note, updating `email` and `externalId` is not supported at this time.  @see {@link User}
     * @param {object<User>} user  - User object to update.
     * fortuna.user.create(user)
     *             .then(res => {
     *                  // {
     *                  //  message: "USER_UPDATE_SUCCESS",
     *                  //  hasWarnings: false,
     *                  //  warnings: []
     *                  // }
     *              })
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<Object>} - Promise resolves to a object.    The warnings array will contain additional info about invalid data.
     */

    update(user) {
        return new Promise((resolve, reject) => {
            super.put(`${config.user.endpoints.resource}`, user)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }

    /** deactivate
     * @description deactivates a user.
     * @param {string} user  - externalId
     * fortuna.user.deactivate(externalId)
     *             .then(res => {
     *              // user is deactivates
     *              }
     *              })
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<string>} - Promise resolves to a success message.
     */

    deactivate(externalId) {
        return new Promise((resolve, reject) => {
            super.delete(`${config.user.endpoints.resource}/${externalId}`)
                .then((res) => {
                    resolve(res);
                })
                .catch((ex) => reject(ex));
        });
    }
}

module.exports = Users;