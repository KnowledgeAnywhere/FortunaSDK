"use strict";

/** Class representing a User
 * @typedef {User} User
 * @property {string} externalId
 * @property {string} email
 * @property {string} lastName
 * @property {string} firstName
 * @property {string} password
 * @property {boolean} active
 * @property {boolean} sendInitialEmail
 * @property {boolean} forcePasswordChange
 * @property {string} locale
 * @property {string} registrationCode
 * @property {string} businessName
 * @property {string} address1
 * @property {string} address2
 * @property {string} city
 * @property {string} state
 * @property {string} postalCode
 * @property {string} country
 * @property {Array<CustomField>} customFields
 */

class User {

    constructor(user) {
        this.externalId = user.externalId;
        this.email = user.email;
        this.lastName = user.lastName;
        this.firstname = user.firstname;
        this.password = user.password;
        this.active = user.active || true;
        this.sendInitialEmail = user.sendInitialEmail;
        this.forcePasswordChange = user.forcePasswordChange;
        this.registrationCode = user.registrationCode;
        this.customFields = user.customFields;
        this.locale = user.locale;
        this.businessName = user.businessName;
        this.phone = user.phone;
        this.address1 = user.address1;
        this.address2 = user.address2;
        this.country = user.country;
        this.city = user.city;
        this.state = user.state;
        this.postalCode = user.postalCode;
        this.customFields = user.customFields;
    }

    get() {
        return this;
    }
}

module.exports = User;