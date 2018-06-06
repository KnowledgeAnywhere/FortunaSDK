'use strict';

const mocha = require('mocha');
const assert = require('assert');
const chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
const faker = require('faker');

const env = process.env;

const LocalStorage = require('node-localstorage').LocalStorage;
const ls = new LocalStorage('./.data');

// lib

// Helpers

const Environment = require('../lib/helpers/environment.helper');

// Models

const Token = require('../lib/models/token.model');
const User = require('../lib/models/user.model');
const CustomField = require('../lib/models/custom-field.model');

// Namespace
const lms = require('../index.js');

describe('env vars', function() {
  it(' should be defined and strings', function() {
    env.LMS_SECRET.should.be.a('string');
    env.LMS_AUDIENCE.should.be.a('string');
  });
});

describe('Environment', function() {
  it('should return the current environment', function() {
    const _e = Environment.get;
    _e.should.be.a('object');
    _e.audience.should.be.a('string');
    _e.secret.should.be.a('string');
    _e.apiURL.should.be.a('string');
  });
});

describe('lms', function() {
  it('should be defined and an object', function() {
    expect(lms).to.be.an('object');
  });

  describe('lms.auth', function() {
    it('should be defined and an object', function() {
      expect(lms.auth).to.be.an('object');
    });
    describe('lms.auth.getSingleUseToken()', function() {
      it('should return a string containing Bearer', function(done) {
        lms.auth
          .getSingleUseToken()
          .then(function(res) {
            res.should.contain('Bearer');
          })
          .catch(ex => {
            console.log(ex);
          })
          .finally(done);
      });
    });

    ls.clear(); // Remove any tokens in storage;
    describe('lms.auth.token()', function() {
      var token;
      it('should return a token object', function(done) {
        lms.auth
          .token()
          .then(function(res) {
            token = res;
            res.should.have.property('authorization');
          })
          .catch(ex => {
            console.log(ex);
          })
          .finally(done);
      });

      it('should return the token from LS instead of creating a new one', function(done) {
        lms.auth
          .token()
          .then(function(res) {
            res.accessToken.should.equal(token.accessToken);
          })
          .finally(done);
      });
    });
  });
}); // lms.auth

describe('lms.api', function() {
  it('lms.api.get should get data', function(done) {
    lms.api
      .get('ping')
      .then(function(res) {
        res.should.equal('Service Running');
      })
      .finally(done);
  });
}); // lms.api

describe('lms.ping', function() {
  it('should be defined and an object', function() {
    expect(lms.ping).to.be.an('object');
  });

  describe('lms.ping.checkHealth()', function() {
    it('should return a message', function(done) {
      lms.ping
        .checkHealth()
        .then(function(res) {
          res.should.equal('Service Running');
        })
        .catch(function(ex) {})
        .finally(done);
    });
  }); // lms.ping
});

const userProto = require('./user.proto');
const _user = userProto;
_user.externalId = faker.random.uuid();
_user.email = faker.internet.exampleEmail();
_user.sendinitialemail = false;

describe('lms.users', function() {
  it('should be defined and an object', function() {
    expect(lms.users).to.be.an('object');
  });

  describe('lms.user.create()', function() {
    it('should create a user', function(done) {
      lms.users
        .create(_user)
        .then(function(res) {
          res.message.should.equal('USER_PROVISION_SUCCESS');
        })
        .catch(function(ex) {})
        .finally(done);
    });
  }); // Users.create

  describe('lms.user.findById()', function() {
    it('should return a single user', function(done) {
      lms.users
        .findById('fxcadgddgaa657dsda55fdgdfg')
        .then(function(res) {
          res.externalId.should.be.defined;
        })
        .catch(function(ex) {})
        .finally(done);
    });
  }); // Users.findById

  describe('lms.user.update', function() {
    let ___user = {};
    ___user.externalId = 'fxcadgddgaa657dsda55fdgdfg';
    ___user.ssoId = faker.random.uuid();
    it('should update a single user', function(done) {
      lms.users
        .update(___user)
        .then(function(_res) {
          _res.should.be.defined;
        })
        .catch(function(ex) {})
        .finally(done);
    });
  }); // Users.update
}); // lms

// Models

describe('User', function() {
  it('should be defined and an object', function() {
    expect(User).to.be.an('function');
  });
}); // User

describe('Token', function() {
  it('should be defined and an object', function() {
    expect(Token).to.be.an('function');
  });
}); // Token

describe('CustomField', function() {
  it('should be defined and an instance of CustomField', function() {
    let cfd = new CustomField({
      name: 'Custom Field One',
      value: 'Manager'
    });
    console.log(cfd.name);
    expect(cfd).to.be.an.instanceOf(CustomField);
  });
}); // CustomField
