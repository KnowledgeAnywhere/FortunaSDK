'use strict';
const Promise = require('bluebird');

const LMSAPI = require('./lms-api.module');
const config = require('../config.js');

/** Users
 * @module Users
 * @extends LMSAPI
 * @description The users module contains functions related to creating, reading, updating and deactivating users.
 */

class Users extends LMSAPI {
  /** Search for users.   If you only want to return 1000 users at a time, use the offset parameter.   Otherwise all users will returned.
   * @param {Object} searchParams - Object containing search parameters.   See properties.
   * @property {string} startdate - Filter users by the date they were created.  Should be a unix timestamp (ms) .   Optional.   Defaults to 0 (midnight 1970, UTC)
   * @property {string} enddate - Filter users by the date they were created.  Should be a unix timestamp (ms) .   Optional.   Defaults to the current  UTC time. (same as calling `new Date().getTime()`)
   * @property {string[]} externalds -   Filters users by their `externalId`
   * @property {string[]} ssoIds -   Filters users by their `ssoId`
   * @property {string[]} emails -   Comma separated list of emails to return. Commas must be escaped for HTML. Each item will be executed as a fuzzy search, not an exact match. This means searching for `@knowledgeanywhere.com` will return any users with `@knowledgeanywhere.com` in their email.
   * @property {boolean} includeInactive - When true, inactive users will be included in the results set.
   * @property {int} offset - num of records to offset.     Returns the first 1000 records of the collection by default (`offset: 0`).   A offset of 1000 (`offset: 1000`) will return the next 1000 records.
   * @returns {Promise<User[]>} - Resolves to a promise containing an array of users.
   */
  find(searchParams = {}) {
    return new Promise((resolve, reject) => {
      if (searchParams.offset && searchParams.offset > 0) {
        const params = super._serialize(searchParams);
        this._reqUsers(params)
          .then(users => {
            resolve(users);
          })
          .catch(ex => {
            return reject(ex);
          });
      } else {
        this._getAllUsers(searchParams)
          .then(users => {
            resolve(users);
          })
          .catch(ex => {
            return reject(ex);
          });
      }
    });
  }

  async _getAllUsers(searchParams) {
    return new Promise(async (resolve, reject) => {
      let records = [];
      let keepGoing = true;
      searchParams.offset = 0;
      while (keepGoing) {
        let params = super._serialize(searchParams);
        let response;
        try {
          response = await this._reqUsers(params);
        } catch (ex) {
          reject(ex);
        }
        await records.push.apply(records, response);
        searchParams.offset += 1000;
        if (!response || response.length < 1000) {
          keepGoing = false;
          resolve(records);
        }
      }
    });
  }

  _reqUsers(params) {
    return new Promise((resolve, reject) => {
      super
        .get(config.users.endpoints.find + params)
        .then(users => {
          resolve(users);
        })
        .catch(ex => {
          reject(ex);
        });
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
      super
        .get(`${config.user.endpoints.resource}/${externalId}`)
        .then(user => {
          resolve(user);
        })
        .catch(ex => {
          return reject(ex);
        });
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
      super
        .post(`${config.user.endpoints.resource}`, user)
        .then(user => {
          resolve(user);
        })
        .catch(ex => {
          return reject(ex);
        });
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
      super
        .put(`${config.user.endpoints.resource}/${user.externalId}`, user)
        .then(user => {
          resolve(user);
        })
        .catch(ex => {
          return reject(ex);
        });
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
      super
        .delete(`${config.user.endpoints.resource}/${externalId}`)
        .then(res => {
          resolve(res);
        })
        .catch(ex => {
          return reject(ex);
        });
    });
  }
}

module.exports = Users;
