"use strict";

const mocha = require('mocha');
const assert = require('assert');
const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

const env = process.env;

const LocalStorage = require('node-localstorage').LocalStorage;
const ls = new LocalStorage('./.data');



// lib

// Helpers

const Environment = require('../lib/helpers/environment.helper');

// Models

const Auth = require('../lib/modules/auth.module');
const Token = require('../lib/models/token.model');
const User = require('../lib/models/user.model');
const CustomField = require('../lib/models/custom-field.model');

// Namespace
const fortuna = require('../index.js');

describe('env vars', function () {
    it(' should be defined and strings', function () {
        env.LMS_SECRET.should.be.a('string');
        env.LMS_AUDIENCE.should.be.a('string');
        env.LMS_API_URL.should.be.a('string');
    });
});

describe('Environment', function () {
    it('should return the current environment', function () {
        const _e = Environment.get;
        _e.should.be.a('object');
        _e.audience.should.be.a('string');
        _e.secret.should.be.a('string');
        _e.apiURL.should.be.a('string');
    });
});

describe('fortuna', function () {
    it('should be defined and an object', function () {
        expect(fortuna).to.be.an('object');
    })

    describe('fortuna.auth', function () {
        it('should be defined and an object', function () {
            expect(fortuna.auth).to.be.an('object');
        })
        describe('fortuna.auth.getSingleUseToken()', function () {
            it('should return a string containing Bearer', function (done) {
                fortuna.auth.getSingleUseToken()
                    .then(function (res) {
                        res.should.contain('Bearer');
                    }).catch(ex => {
                        console.log(ex);
                    }).finally(done);

            });
        });

        ls.clear(); //Remove any tokens in storage;
        describe('fortuna.auth.token()', function () {
            var token;
            it('should return a token object', function (done) {
                fortuna.auth.token()
                    .then(function (res) {
                        token = res;
                        res.should.have.property('authorization');
                    }).catch(ex => {
                        console.log(ex);
                    }).finally(done);

            });

            it('should return the token from LS instead of creating a new one', function (done) {
                fortuna.auth.token()
                    .then(function (res) {
                        res.accessToken.should.equal(token.accessToken);
                    }).finally(done);
            });
        });
    });

}); // fortuna.auth

describe('fortuna.api', function () {
    it('fortuna.api.get should get data', function (done) {
        fortuna.api.get('ping')
            .then(function (res) {
                res.should.equal('Service Running');
            }).finally(done);
    });
}); // fortuna.api

describe('fortuna.ping', function () {
    it('should be defined and an object', function () {
        expect(fortuna.ping).to.be.an('object');
    });

    describe('fortuna.ping.checkHealth()', function () {
        it('should return a message', function (done) {
            fortuna.ping.checkHealth()
                .then(function (res) {
                    res.should.equal('Service Running');
                })
                .catch(function (ex) {}).finally(done);

        });
    }); // fortuna.ping
});

const userProto = require('./user.proto');

describe('fortuna.users', function () {
    it('should be defined and an object', function () {
        expect(fortuna.users).to.be.an('object');
    });

    //Users.find

    var comparitor;

    describe('fortuna.user.find()', function () {
        it('should return users', function (done) {
            fortuna.users.find()
                .then(function (res) {
                    console.log(res);
                    res.should.be.an('array');
                    comparitor = res[0];
                })
                .catch(function (ex) {}).finally(done);

        }); // Users.find

    //Users.find

    describe('fortuna.user.findById()', function () {
        it('should return a single user', function (done) {
            fortuna.users.findById(comparitor.externalId)
                .then(function (res) {
                    console.log(res);
                    res.should.be.defined;
                })
                .catch(function (ex) { }).finally(done);
        });

        }); // Users.find


    }); // fortuna.users

}); // fortuna

// Models


describe('User', function () {
    it('should be defined and an object', function () {
        expect(User).to.be.an('function');
    });
}); // User

describe('Token', function () {
    it('should be defined and an object', function () {
        expect(Token).to.be.an('function');
    });
}); // Token


describe('CustomField', function () {
    it('should be defined and an instance of CustomField', function () {
        let cfd = new CustomField({
            name: "Custom Field One",
            value: "Manager"
        });
        console.log(cfd.name);
        expect(cfd).to.be.an.instanceOf(CustomField);
    });
}); //CustomField