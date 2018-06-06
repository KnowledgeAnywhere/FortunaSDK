'use strict';

require('dotenv').config();

const p = process.env;

class Environment {
  static get url() {
    let url;
    switch (p.Environment) {
      case 'stage':
        url = 'https://externalapi.lms.knowledgeanywhere.com';
        break;
      default:
        url = 'https://publicapi.knowledgeanywhere.com';
        break;
    }
    url = p.LMS_API_URL ? p.LMS_API_URL : url;
    return url;
  }

  static get get() {
    return {
      audience: p.LMS_AUDIENCE,
      secret: p.LMS_SECRET,
      apiURL: this.url
    };
  }
}

module.exports = Environment;
