"use strict";

const FortunaAPI = require('./fortuna-api.class');

module.exports = class Ping extends FortunaAPI {

    static checkHealth() {
        return new Promise((resolve, reject) => {
            let endpoint = "ping/authorized";
            super.get(endpoint)
                .then((res) => {
                    resolve(res);
                })
                .catch((ex) => reject(ex));
        });

    }
};