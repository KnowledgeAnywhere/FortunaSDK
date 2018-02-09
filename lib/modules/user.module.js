"use strict";

const Fortuna = require('./fortuna-api.module');
const config = require('../../config.js');

/** User
 * @extends FortunaAPI
 * @description The user module is a utility class used to determine service availability.   WARNING:  This module may be deprecated or subject to change.
 * It's primary usage at this stage is for testing.   Documentation will most certainly be dropped beyond the initial full release.
 */

class User extends Fortuna {

    /** findById
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
     * @description Creates a new user.
     * @param user {object<User>} - User object to update.
     * @example
     * fortuna.user.create()
     *                .then((res) => console.log(res))
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<string>} - Promise resolves to a string with a success message.
     */

    static create(user) {
        return new Promise((resolve, reject) => {
            super.post(`${config.user.endpoints.resource}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }

    /**
     * @method update
     * @static
     * @description Update a user.
     * @param user {object<User>} - User object to update.   Partial updates are allowed and only the fields passed in will be updated.
     * @example
     * var user = {
     *  externalId: dd8e8d7djd88d3djz304,
     *  firstName: Elle
     *  lastName: Wilson
     *  email: elle.wilson@knowledgeanywhere.com
     * };
     * fortuna.user.update(user)
     *                .then((res) => console.log(res))
     *                .catch((ex) => console.log(ex));
     * @returns {Promise<string>} - Promise resolves to a string with a success message.
     */

    static update(user) {
        return new Promise((resolve, reject) => {
            super.put(`${config.user.endpoints.resource}/${externalId}`)
                .then((user) => {
                    resolve(user);
                })
                .catch((ex) => reject(ex));
        });
    }
}

module.exports = User;