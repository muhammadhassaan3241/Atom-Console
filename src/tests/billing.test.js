// import supertest from "supertest";
// import app from "../app.js"
// const request = supertest(app);
// import billingServices from "../services/billing.services.js";
// import { expect } from "chai";

// const validCredentials = {
//     email: "alie@yopmail.com",
//     password: "alie"
// }

// let token;

// describe("GET /api/billing/invoices/read", () => {
//     before(async () => {
//         const response = await request
//             .post("/api/admin/login")
//             .send(validCredentials);

//         token = response.body.token;
//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Successfully Logged In");
//     })

//     it('returns a list of invoices', async function () {
//         const response = await request
//             .get('/api/billing/invoices/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .expect(200)

//         expect(response.body.status).to.equal('1');
//         expect(response.body.message).to.equal('Invoices Found Successfully');
//         expect(response.body.data).to.be.an('array');
//         expect(response.body.data[0]).to.have.property('invoice_uid');
//         expect(response.body.data[0]).to.have.property('amount');
//         expect(response.body.data[0]).to.have.property('invoice_month');
//         expect(response.body.data[0]).to.have.property('payment_date');
//         expect(response.body.data[0]).to.have.property('status');
//         expect(response.body.data[0]).to.have.property('action');
//         expect(response.body.data[0]).to.have.property('details');

//     });

//     it('should return an error if bearer token is not provided', async () => {
//         const response = await request
//             .get('/api/billing/invoices/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer token`)
//             .expect(403)

//         expect(response.body).to.have.property('message', 'Forbidden');

//     });
// })

// describe("GET /api/billing/getBillingEstimations/read", () => {

//     before(async () => {
//         const response = await request
//             .post("/api/admin/login")
//             .send(validCredentials);

//         token = response.body.token;
//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Successfully Logged In");
//     })

//     it('returns a list of partner bills', async function () {
//         const response = await request
//             .get('/api/billing/invoices/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .expect(200)

//         expect(response.body.status).to.equal('1');
//         expect(response.body.message).to.equal('Invoices Found Successfully');
//         expect(response.body.data).to.be.an('array');
//         expect(response.body.data[0]).to.have.property('invoice_uid');
//         expect(response.body.data[0]).to.have.property('amount');
//         expect(response.body.data[0]).to.have.property('invoice_month');
//         expect(response.body.data[0]).to.have.property('payment_date');
//         expect(response.body.data[0]).to.have.property('status');
//         expect(response.body.data[0]).to.have.property('action');
//         expect(response.body.data[0]).to.have.property('details');

//     });

//     it('should return a list of user account costs', async () => {
//         const response = await request
//             .get('/api/billing/getBillingEstimations/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .query({ from_date: '2022-04-24', to_date: '2023-03-01' })
//             .expect(200)

//         expect(response.body.status).to.equal('1');
//         expect(response.body.message).to.equal('Cost Of Monthly Account Record Found Sucessfully');
//         expect(response.body.data).to.be.an('array');
//         expect(response.body.data[0]).to.have.property('name');
//         expect(response.body.data[0]).to.have.property('month');
//         expect(response.body.data[0]).to.have.property('total_cost_of_paid_accounts') || expect(response.body.data[0]).to.have.property('total_cost_of_trial_accounts');;

//     });

//     it('should return an error if resellerId is not provided', async () => {
//         const response = await request
//             .get('/api/billing/getBillingEstimations/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .query({ from_date: '0000-00-00', to_date: '0000-00-00' })
//             .expect(404)

//         expect(response.body).to.have.property('message', 'Cost Of Monthly Account Record Not Found');

//     });


//     it('should return an error if resellerId is not provided', async () => {
//         const response = await request
//             .get('/api/billing/getBillingEstimations/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer token`)
//             .query({ from_date: '0000-00-00', to_date: '0000-00-00' })
//             .expect(403)

//         expect(response.body).to.have.property('message', 'Forbidden');

//     });

// })

// describe('GET /api/billing/connected-users/read', () => {

//     before(async () => {
//         const response = await request
//             .post("/api/admin/login")
//             .send(validCredentials);

//         token = response.body.token;
//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Successfully Logged In");
//     })

//     it('should return 403 if bearer token is not provided', async function () {

//         const expectedMessage = 'Forbidden';

//         const response = await request
//             .get('/api/billing/connected-users/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer token`)
//             .expect(403)


//         expect(response.body).to.have.property('message', expectedMessage);

//     });

//     it('should return 200 with user data if token is provided and return all connected users usernames', async function () {

//         const expectedStatus = '1';
//         const expectedMessage = 'Connected Users Found Successfully';

//         const response = await request
//             .get(`/api/billing/connected-users/read`)
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .expect(200)

//         expect(response.body).to.have.property('status', expectedStatus);
//         expect(response.body).to.have.property('message', expectedMessage);
//         expect(response.body.data).to.be.an('array');
//         expect(response.body.data[0]).to.have.property('username');

//     });

//     it('should return a failed response with status code 404', async function () {

//         const reseller_Id = 123;

//         const errorMessage = 'Connected Users Not Found';
//         const statusCode = 404;
//         const customStatus = '0';
//         const originalMethod = billingServices.getVpnConnectedUsers;
//         billingServices.getVpnConnectedUsers = (resellerId = reseller_Id, callback) => {
//             callback([], statusCode, customStatus, errorMessage);
//         };

//         const response = await request
//             .get('/api/billing/connected-users/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)

//         expect(response.body).to.have.property('status', customStatus);
//         expect(response.body).to.have.property('message', errorMessage);

//         billingServices.getVpnConnectedUsers = originalMethod;

//     });

// });

// describe('GET /api/billing/active-users/read', () => {

//     before(async () => {
//         const response = await request
//             .post("/api/admin/login")
//             .send(validCredentials);

//         token = response.body.token;
//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Successfully Logged In");
//     })

//     it('should return 403 if bearer token is not provided', async function () {

//         const expectedMessage = 'Forbidden';

//         const response = await request
//             .get('/api/billing/active-users/read')
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer token`)
//             .expect(403)


//         expect(response.body).to.have.property('message', expectedMessage);

//     });

//     it('should return 200 with user data if token is provided and return all connected users usernames', async function () {

//         const expectedStatus = '1';
//         const expectedMessage = 'Active Users Found Successfully';

//         const response = await request
//             .get(`/api/billing/active-users/read`)
//             .set('Content-Type', 'application/json')
//             .set('Authorization', `Bearer ${token}`)
//             .expect(200)

//         expect(response.body).to.have.property('status', expectedStatus);
//         expect(response.body).to.have.property('message', expectedMessage);
//         expect(response.body.data).to.be.an('array');
//         expect(response.body.data[0]).to.have.property('username');

//     });

//     // it('should return a failed response with status code 404', async function () {

//     //     const reseller_Id = 123;

//     //     const errorMessage = 'Active Users Not Found';
//     //     const statusCode = 404;
//     //     const customStatus = '0';
//     //     const originalMethod = billingServices.getVpnActiveUsers;
//     //     billingServices.getVpnActiveUsers = (resellerId = reseller_Id, callback) => {
//     //         callback([], statusCode, customStatus, errorMessage);
//     //     };

//     //     const response = await request
//     //         .get('/api/billing/active-users/read')
//     //         .set('Content-Type', 'application/json')
//     //         .set('Authorization', `Bearer ${token}`)

//     //     expect(response.body).to.have.property('status', customStatus);
//     //     expect(response.body).to.have.property('message', errorMessage);

//     //     billingServices.getVpnActiveUsers = originalMethod;

//     // });

// });