const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert, expect } = require('chai');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const vars = { token: null, customer: null, email: null, account: null };
const admin = { token: null, email: null, user: null, scope: 'admin' };
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
            vars.account = res.body;
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body.accountType, 'saving');
            done();
        });
    });

    it('should be able to get account details using get /apiV1/accountDetails/:id', (done) => {
        chai.request(server)
        .get(`/apiV1/accountDetails/${vars.account._id}`)
        .set('authorization', vars.token)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body._id, vars.account._id);
            done();
        });
    });
});

describe('An admin', () => {
    beforeEach((done) => {
        admin.email = 'admin@unitedbank.com';
        agent
        .post('/apiV1/loginAdmin')
        .send({ email: admin.email, password: 'admin' })
        .end((err, res) => {
            assert.equal(res.body.user.name, 'Admin');
            admin.user = res.body.user;
            admin.token = res.body.token;
            done();
        });
    });

    it('should be able to get account requests using get /apiV1/accountRequests', (done) => {
        chai.request(server)
        .get('/apiV1/accountRequests')
        .set('authorization', admin.token)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should be able to get account data using get /apiV1/accounts', (done) => {
        chai.request(server)
        .get('/apiV1/accounts')
        .set('authorization', admin.token)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should be able to approve account request using post /apiV1/approveAccountRequest', (done) => {
        chai.request(server)
        .post('/apiV1/approveAccountRequest')
        .set('authorization', admin.token)
        .send({_id: vars.account._id, balance: 500})
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body.isActive, true);
            done();
        });
    });

    it('should be able to update balance using post /apiV1/accountBalance', (done) => {
        chai.request(server)
        .post('/apiV1/accountBalance')
        .set('authorization', admin.token)
        .send({_id: vars.account._id, balance: 5000})
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body.balance, 5000);
            done();
        });
    });

    it('should be able to delete account using delete /apiV1/account/:id', (done) => {
        chai.request(server)
        .delete(`/apiV1/account/${vars.account._id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            assert.equal(res.body.accountType, 'saving');
            done();
        });
    });

});