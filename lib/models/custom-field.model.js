"use strict";

/** Model representing a Custom Field
 * @typedef {CustomField}
 * @param {object} cfd - Object containing the Custom Field Definition
 * @property {string} name - String containing the name of the custom field
 * @property {string} value - String containing the value of the custom field.    If the custom field is multiselect, you can use commas to seperate out the values.
 */

class CustomField {
    constructor(cfd) {
        this.name = cfd.name;
        this.value = cfd.value;
    }



}

module.exports = CustomField;