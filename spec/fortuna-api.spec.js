"use strict";

let mocha = require('mocha');
let assert = require('assert');
let chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

let env = process.env;

const Environment = require('../lib/environment.helper');
const Auth = require('../lib/auth.module');
const fortuna = require('../index.js');


describe('env vars', () => {
    it(' should be defined and strings', () => {
        env.FORTUNA_SECRET.should.be.a('string');
        env.FORTUNA_AUDIENCE.should.be.a('string');
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
});

describe('fortuna', () => {
    it('should be defined and an object', () => {
        expect(fortuna).to.be.an('object');
    })

    it('fortuna.$.get should get data', () => {
        fortuna.$.get('ping')
            .then((res) => {
                res.should.equal('Service Running');
            });

        describe('fortuna.ping', () => {
            it('should be defined and an object', () => {
                expect(fortuna.ping).to.be.an('function')
            })

            describe('fortuna.ping.checkHealth()', () => {
                it('should return a message', () => {
                    fortuna.ping.checkHealth()
                        .then((res) => {
                            res.should.equal(' Hello Megan || Aaron || Beth.   ¯\\_(ツ)_/¯.  #MeganThingsHappen');
                        });

                });
            });
        }); // Fortuna.Ping

    });
}); // Fortuna