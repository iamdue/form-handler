/*
    install tests:
    $ npm i -g http-server
    $ npm i -g mocha

    run tests:
    $ http-server
    $ mocha
*/
'use strict';

const Nightmare = require('nightmare');
const url = require('url');
require('chai').should();

const base = 'http://localhost:8080/';

describe('Form Handler', function () {
    let nightmare;

    beforeEach(function() {
        nightmare = Nightmare();
    });

    afterEach(function(done) {
        nightmare.end(done);
    });

    it('should read the values', done => {

        let name = 'John Smith';

        nightmare.goto(fixture('example'))
            .type('input[name="name"]', name)
            .evaluate(function () {
                return fields.read();
            })
            .then(output => {
                output.name.should.equal(name);
                output['confirm-name'].should.equal('');
                done();
            });
    });

    it('should read only the changes', done => {

        let name = 'John Smith';

        nightmare.goto(fixture('example'))
            .type('input[name="name"]', name)
            .evaluate(function () {
                return fields.changes();
            })
            .then(output => {
                output.name.should.equal(name);
                Object.keys(output).length.should.equal(1);
                done();
            });
    });

    it('should validate', done => {

        nightmare.goto(fixture('example'))
            .evaluate(function () {
                return fields.validate(true, true).map(function(field) {
                    return field.name;
                }).toString();
            })
            .then(output => {
                output.should.equal('name,email,age,agree,learn');
                done();
            });
    });

    it('should be valid name and email', done => {

        let name = 'John Smith';
        let email = 'john@smith.net';

        nightmare.goto(fixture('example'))
            .type('input[name="name"]', name)
            .type('input[name="email"]', email)
            .evaluate(function () {
                return fields.validate(true, true).map(function(field) {
                    return field.name;
                }).toString();
            })
            .then(output => {
                output.should.equal('confirm-name,age,agree,learn');
                done();
            });
    });

    it('should be valid name, confirm-name, age, agree and learn', done => {

        let name = 'John Smith';
        let age = '11-20';

        nightmare.goto(fixture('example'))
            .type('input[name="name"]', name)
            .type('input[name="confirm-name"]', name)
            .select('select[name="age"]', age)
            .check('input[name="agree"]')
            .check('input[name="learn"]')
            .evaluate(function () {
                return fields.validate(true, true).map(function(field) {
                    return field.name;
                }).toString();
            })
            .then(output => {
                output.should.equal('email,sure');
                done();
            });
    });

});

function fixture(path) {
    return url.resolve(base, path);
}
