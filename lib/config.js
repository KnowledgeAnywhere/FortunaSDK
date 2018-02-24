"use strict";

const config = {
    global: {},
    auth: {
        endpoints: {}
    },
    ping: {
        endpoints: {}
    },
    user: {
        endpoints: {}
    },
    users: {
        endpoints: {}
    }
};

config.global.userAgent = 'FortunaSDK@alpha'; // <name>@semver

config.auth.endpoints.token = 'auth/token';

config.ping.endpoints.checkHealth = 'ping';

config.user.endpoints.resource = 'v1/user';

config.users.endpoints.find = 'v1/users';

module.exports = config;