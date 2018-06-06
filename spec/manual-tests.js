'use strict';

const lms = require('../index');
const Environment = require('../lib/helpers/environment.helper');

console.log(Environment.get);

lms.users.find().then(users => {
  console.log(users);
});
