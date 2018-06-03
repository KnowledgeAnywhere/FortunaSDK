'use strict';

/** Model representing a Custom Field
 * @typedef {CustomField}
 * @param {object} CustomFieldDefinition - Object containing the Custom Field Definition
 * @property {string} name - String containing the name of the custom field. If the property is not matched to an existing value in the system, it will be created.
 * @property {string} value - String containing the value of the custom field.    The value can be a single value or a comma seperated string.   If the property is not matched to an existing value, it will be created.
 */

class CustomField {
  constructor(cfd) {
    this.name = cfd.name;
    this.value = cfd.value;
  }
}

module.exports = CustomField;
