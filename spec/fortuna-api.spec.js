"use strict";

const mocha = require('mocha');
const assert = require('assert');
const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

const env = process.env;

const LocalStorage = require('node-localstorage').LocalStorage;
const ls = new LocalStorage('./.data');

const Environment = require('../lib/helpers/environment.helper');
const Auth = require('../lib/modules/auth.module');
const fortuna = require('../index.js');

describe('env vars', function () {
    it(' should be defined and strings', function () {
        env.FORTUNA_SECRET.should.be.a('string');
        env.FORTUNA_AUDIENCE.should.be.a('string');
        env.FORTUNA_API_URL.should.be.a('string');
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
            expect(fortuna.auth).to.be.an('function')
        })
        describe('fortuna.auth.getSingleUseToken()', function (done) {
            it('should return a string containing Bearer', function () {
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

                    }).catch(ex => {
                        console.log(ex);
                    }).finally(done);
            });
        });

    }); // fortuna.auth

    describe('fortuna.$', function () {
        it('fortuna.$.get should get data', function (done) {
            fortuna.$.get('ping')
                .then(function (res) {
                    res.should.equal('Service Running');
                })
                .catch(ex => {
                    console.log(ex);
                }).finally(done);
        });
    }); // fortuna.$

    describe('fortuna.ping', function () {
        it('should be defined and an object', function () {
            expect(fortuna.ping).to.be.an('function');
        });

        describe('fortuna.ping.checkHealth()', function () {
            it('should return a message', function (done) {
                fortuna.ping.checkHealth()
                    .then(function (res) {
                        res.should.equal('Service Running');
                        done();
                    })
                    .catch(function (ex) {
                        assert.fail();
                        done();
                    });

            });
        });
    }); // fortuna.ping

}); // fortuna