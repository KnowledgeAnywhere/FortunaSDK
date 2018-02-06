"use strict";

const Fortuna = require('./fortuna-api.module');
const config = require('../../config.js');

/**
 * @module Users
 * @memberof Fortuna
 * @alias fortuna.users
 * @extends Fortuna
 * @description The users module is a utility class used to determine service availability.   WARNING:  This module may be deprecated or subject to change.
 * It's primary usage at this stage is for testing.   Documentation will most certainly be dropped beyond the initial full release.
 */

class Users extends Fortuna {

    /** find users */
    static find() {
        return new Promise((resolve, reject) => {
            super.get(config.users.endpoints.resource)
                .then((res) => {
                    resolve(res);
                })
                .catch((ex) => reject(ex));
        });

    }
}

module.exports = Users;