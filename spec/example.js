require('dotenv').config();

const Promise = require('bluebird');
const request = require('request-promise');

// Hoist our users array.
let users = [];

const API_ENDPOINT = `http://publicapi.local.questtrack.com`;
const CLIENT_ID = process.env.FORTUNA_AUDIENCE
const CLIENT_SECRET = process.env.FORTUNA_SECRET

const go = async () => {
    const tokenReq = {
        method: 'POST',
        uri: `${API_ENDPOINT}/auth/token`,
        json: true,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials'
        }
    };
    const token = await request(tokenReq);
    users = await getUsers(token);
    console.log(`Total length of users is ${users.length}`);
}

const getUsers = async (token) => {
    let records = [];
    let keepGoing = true;
    let offset = 0;
    while (keepGoing) {
        let response = await reqUsers(token, offset)
        await records.push.apply(records, response);
        offset += 1000;
        if (response.length < 1000) {
            keepGoing = false;
            return records;
        }
    }
}

const reqUsers = async (token, offset) => {
    const userReq = {
        uri: `${API_ENDPOINT}/v1/users?offset=${offset}`,
        json: true,
        headers: {
            "Authorization": `Bearer ${token.access_token}`,
        }
    };
    let payload = await request(userReq);
    return payload;
}

go()