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


});