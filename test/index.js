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

    afterEach(function() {
        return nightmare.end();
    });

    it('should read the values', done => {

        let name = 'John Smith';

        nightmare.goto(fixture('example'))
            .type('input[name="name"]', name)
            .click('.LogValues')
            .evaluate(readOutput)
            .then(output => {
                let values = JSON.parse(output);
                values.name.should.equal(name);
                values['confirm-name'].should.equal('');
                done();
            });
    });

    it('should read only the changes', done => {

        let name = 'John Smith';

        nightmare.goto(fixture('example'))
            .type('input[name="name"]', name)
            .click('.LogChanges')
            .evaluate(readOutput)
            .then(output => {
                output.should.equal(`{"name":"${name}"}`);
                done();
            });
    });

});

function fixture(path) {
    return url.resolve(base, path);
}

function readOutput() {
    return document.querySelector('.Output').value;
}
