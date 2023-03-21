import request from 'supertest';
import app from '../app.js';
import { expect } from 'chai';

describe('getInvoices API', () => {
    it('returns a list of invoices', (done) => {
        request(app)
            .get('/api/invoices/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', process.env.CHARGIFY_AUTH_TOKEN)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.status).to.equal('1');
                expect(res.body.message).to.equal('Invoices Found Successfully');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.have.property('invoice_uid');
                expect(res.body.data[0]).to.have.property('amount');
                expect(res.body.data[0]).to.have.property('invoice_month');
                expect(res.body.data[0]).to.have.property('payment_date');
                expect(res.body.data[0]).to.have.property('status');
                expect(res.body.data[0]).to.have.property('action');
                expect(res.body.data[0]).to.have.property('details');
                done();
            });
    });

});
