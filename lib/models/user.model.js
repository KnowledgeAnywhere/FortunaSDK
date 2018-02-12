"use strict";

/** Class representing a user
 * @typedef {User} User
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





    }

    get() {
        return this;
    }
}

module.exports = User;