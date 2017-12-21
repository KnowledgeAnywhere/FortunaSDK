"use strict";

let mocha = require('mocha');
let assert = require('assert');
let chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

let env = process.env;

const Environment = require('../lib/environment.module');
const Auth = require('../lib/auth.module');
const Fortuna = require('../lib/fortuna-api.class');
const Ping = require('../lib/ping.module');

describe('env vars', () => {
    it(' should be defined and strings', () => {
        env.SECRET.should.be.a('string');
        env.AUDIENCE.should.be.a('string');
    });
});

describe('Environment', () => {
    it('should return the current environment', () => {
        let _e = Environment.get();
        _e.should.be.a('object');
        _e.audience.should.be.a('string');
        _e.secret.should.be.a('string');
        _e.apiURL.should.be.a('string');
    });

    describe('Fortuna', () => {
        it('should return service running', () => {
            Fortuna.get('ping')
                .then((res) => {
                    res.should.equal('Service Running');
                });

        });
        describe('Fortuna.Ping.checkHealth()', () => {
            it('should return a cooky message', () => {
                Ping.checkHealth()
                    .then((res) => {
                        res.should.equal(' Hello Megan || Aaron || Beth.   ¯\\_(ツ)_/¯.  #MeganThingsHappen');
                    });

            });
        });
    });
});