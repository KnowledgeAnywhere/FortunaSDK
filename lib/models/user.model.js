'use strict';

/** Class representing a User
 * @description Most fields are optional.   Only required fields are externalId, email, lastName, FirstName.
 * @typedef {User} User
 * @property {string} externalId - The unique identifier from the system calling the API for this user
 * @property {string} email - The email for the user.
 * @property {string} lastName - The last name for the user
 * @property {string} firstName - The first name for the user
 * @property {string} password - Plain text password (optional). There is a minimum length requirement of 6 characters.
 * @property {string} ssoId - Unique identifier utilized by the Single Sign-on system integrated with the LMS used to uniquely identify this user for sign-on.  If Provisioning and SSO are handled by the same system this could be the same data passed for externalId.
 * @property {boolean} active  - Make user active/inactive in the LMS
 * @property {string} siteName - The name of the microsite.
 * @property {boolean} sendInitialEmail - Send the user an email with a link to the LMS. Defaults to false
 * @property {boolean} forcePasswordChange - Make the user change thier passowrd on next login. Defaults to false
 * @property {string} locale - The 4 letter language code. If the code is not active in the LMS the user will be defaulted to the default LMS value. In most cases this is EN-US.    Defaults to EN-US.   If a invalid locale is passed in, the operation will continue, but will return a warning.
 * @property {string} registrationCode - If your LMS uses registration codes for users to self register use this field to assign that code to the user. The value passed in must match a value in the LMS, if no match is found the request will result in a 400 bad request.
 * @property {string} phoneNumber - The phone number for this user
 * @property {string} businessName - The company name for this user
 * @property {string} address1 - The street address, P.O. Box for this user
 * @property {string} address2 - The apartment, suite, unit building, floor, etc for this user
 * @property {string} city - The city for the user
 * @property {string} state - The 2 or 3 letter state/province abbrevation for the user.
 * @property {string} postalCode - The zip or postal code for the user
 * @property {string} country - The 2 or 3 letter ISO country code country for the user. See https://www.iso.org/iso-3166-country-codes.html for the list of valid country codes.   Defaults to the country specified in your LMS configuration.   If a invalid country is specified, the operation will continue, but a warning will be thrown.
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
        this.phoneNumber = user.phoneNumber;
        this.customFields = user.customFields;
    }

    get() {
        return this;
    }
}

module.exports = User;
