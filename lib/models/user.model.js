"use strict";

class User {

    /** Class representing a user
     * @param {object} user - user object to serialize.
     * @property string} externalId { - The unique identifier from the system calling the API for this user
     * @prop {string} firstname - The first name for the user
     * @prop {string} lastName  - The last name for the user
     * @prop {string} email  - The email for the user
     *      */
    constructor(user) {
        this.user = user;
    }
}

module.exports = User;