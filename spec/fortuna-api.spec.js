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

describe('env vars', () => {
    it(' should be defined and strings', () => {
        env.FORTUNA_SECRET.should.be.a('string');
        env.FORTUNA_AUDIENCE.should.be.a('string');
        env.FORTUNA_API_URL.should.be.a('string');
    });
});

describe('Environment', () => {
    it('should return the current environment', () => {
        const _e = Environment.get;
        _e.should.be.a('object');
        _e.audience.should.be.a('string');
        _e.secret.should.be.a('string');
        _e.apiURL.should.be.a('string');
    });
});

describe('fortuna', () => {
    it('should be defined and an object', () => {
        expect(fortuna).to.be.an('object');
    })

    describe('fortuna.auth', () => {
        it('should be defined and an object', () => {
            expect(fortuna.auth).to.be.an('function')
        })
        describe('fortuna.auth.getSingleUseToken()', (done) => {
            it('should return a string containing Bearer', () => {
                fortuna.auth.getSingleUseToken()
                    .then((res) => {
                        res.should.contain('Bearer');
                    }).finally(done);

            });
        });

        ls.clear(); //Remove any tokens in storage;
        describe('fortuna.auth.token()', () => {
            var token;
            it('should return a token object', (done) => {

                fortuna.auth.token()
                    .then((res) => {
                        token = res;
                        res.should.have.property('authorization');
                    }).finally(done);

            });

            it('should return the token from LS instead of creating a new one', (done) => {
                fortuna.auth.token()
                    .then((res) => {
                        res.accessToken.should.equal(token.accessToken);

                    }).finally(done);
            });
        });

    }); // fortuna.auth

    describe('fortuna.$', () => {
        it('fortuna.$.get should get data', (done) => {
            fortuna.$.get('ping')
                .then((res) => {
                    res.should.equal('Service Running');
                }).finally(done);
        });
    }); // fortuna.$

    describe('fortuna.ping', () => {
        it('should be defined and an object', () => {
            expect(fortuna.ping).to.be.an('function');
        })

        describe('fortuna.ping.checkHealth()', () => {
            it('should return a message', (done) => {
                fortuna.ping.checkHealth()
                    .then((res) => {
                        res.should.equal(' Hello Megan || Aaron || Beth.   ¯\\_(ツ)_/¯.  #MeganThingsHappen');
                        done();
                    });

            });
        });
    }); // fortuna.ping

}); // fortuna