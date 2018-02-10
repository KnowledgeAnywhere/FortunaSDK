"use strict";

const Fortuna = require('./fortuna-api.module');
const config = require('../../config.js');

/** User
 * @extends FortunaAPI
 * @description The user module contains functions related to creating, reading, updating and deactivating users.
 */

class User extends Fortuna {

    constructor() {
        super();
    }

    /** Search for users
     * @param {Object} searchParams - Object containing search parameters.
     * @returns {Promise<User[]>} - Resolves to a promise containing an array of users.
     */
    find(searchParams) {
        return new Promise((resolve, reject) => {
            super.get(config.users.endpoints.resource)
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
     * @param {object<User>} user - User object to update.  @see {@link User}
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
            super.put(`${config.user.endpoints.resource}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }

    /** deactivate
     * @description deactivates a user.
     * @param {strig} user  - externalId
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

module.exports = User;