"use strict";

const config = {
    global: {},
    auth: {
        endpoints: {}
    },
    ping: {
        endpoints: {}
    }
};

config.global.userAgent = 'FortunaSDK@alpha'; // <name>@semver

config.auth.endpoints.token = 'auth/token';

config.ping.endpoints.checkHealth = 'ping/authorized';

module.exports = config;