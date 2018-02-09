"use strict";

class User {

    /** Class Representing a User
     * @class User
     * @type User
     * @param {object} user - user object.
     * @prop externalId {string} - The unique identifier from the system calling the API for this user
     * @prop firstname {string} - The first name for the user
     * @prop lastName {string} - The last name for the user
     * @prop email {string} - The email for the user
     *      */
    constructor(user) {
        this.user = user;
    }
}

module.exports = User;