const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert, expect } = require('chai');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const vars = { token: null, customer: null, email: null };
const agent = chai.request.agent(server);

describe('A customer', () => {
    beforeEach((done) => {
        vars.email = `${Math.random().toString(36).substring(7)}@test.com`;
        agent
        .post('/apiV1/customer')
        .send({ name: 'Mocha test', email: vars.email, password: 'password' })
        .end((err, res) => {
            assert.equal(res.body.user.email, vars.email);
            vars.token = res.body.token;
            done();
        });
    });

    it('should be able to login using /apiV1/loginCustomer', (done) => {
        chai.request(server)
        .post('/apiV1/loginCustomer')
        .send({ email: vars.email, password: 'password' })
        .end((err, res) => {
                assert.equal(res.body.user.email, vars.email);
                done();
        });
    });

    it('should be able to get customer data /apiV1/customer', (done) => {
        chai.request(server)
        .get('/apiV1/customer')
        .set('authorization', vars.token)
        .end((err, res) => {
            vars.customer = res.body.customer;
            assert.equal(res.body.customer.email, vars.email);
            done();
        });
        });

    it('should be able to update customer profile with put /apiV1/updateCustomer', (done) => {
        chai.request(server)
          .put('/apiV1/updateCustomer')
          .set('authorization', vars.token)
          .send({ name: "New Mocha test"})
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body.name, "New Mocha test");
            done();
          });
      });

    it('should be able to add new account using post /apiV1/addAcount', (done) => {
        chai.request(server)
        .post('/apiV1/addAccount')
        .set('authorization', vars.token)
        .send({ customer:vars.customer, accountType:'saving'})
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body.accountType, 'saving');
            done();
        });
    });

});