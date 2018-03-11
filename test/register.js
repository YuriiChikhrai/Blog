"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

// For remove user from DB
const UsersModel = require('../server/api/users/users.model');

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach( (done) => {
        UsersModel.remove({username: "test mocha"}, (err) => {
            done();
        });
    });

    describe('/POST register', () => {
        it('it should register new user', (done) => {
            chai
                .request(server)
                .post('/users/register')
                .send({
                    username: "Test mocha",
                    password: "test"
                })
                .end( (err, result) => { // result.body => {message: "User created"}
                    if(err) done(err);
                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.message.should.be.a('string');
                    result.body.message.should.be.eq('User created');
                    done();
                });
        })
    });
});