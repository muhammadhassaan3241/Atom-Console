import supertest from "supertest";
import app from "../app.js";
import dashboardServices from "../services/dashboard.services.js";
const request = supertest(app);
import { expect } from "chai";

const validCredentials = {
    email: "alie@yopmail.com",
    password: "alie"
}

let token;

describe("GET /api/dashboard/monthly-users/read", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it('should return a success response with status code 200', async function () {

        const expectedStatus = '1';
        const expectedMessage = 'Monthly Users Found Successfully';

        const response = await request
            .get('/api/dashboard/monthly-users/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

        expect(response.body).to.have.property('status', expectedStatus);
        expect(response.body).to.have.property('message', expectedMessage);
    });

    it('should return a failed response with error code 500 when Bearer Token is not provided', async function () {

        const expectedMessage = 'Forbidden';

        const response = await request
            .get('/api/dashboard/monthly-users/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer token`)
            .expect(403)

        expect(response.body).to.have.property('message', expectedMessage);
    });


    it('should return a failed response with status code 404', async function () {
        // Mock invalid reseller ID
        const reseller_Id = 123;

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'Monthly Users Not Found';
        const statusCode = 404;
        const customStatus = '0';
        const originalMethod = dashboardServices.getMonthlyConnectedUsers;
        dashboardServices.getMonthlyConnectedUsers = (resellerId = reseller_Id, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/dashboard/monthly-users/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        dashboardServices.getMonthlyConnectedUsers = originalMethod;

    });

});

describe("GET /api/dashboard/protocol-list/read", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it('should return a success response with status code 200', async function () {

        const expectedStatus = '1';
        const expectedMessage = 'Protocol List Found Successfully';

        const response = await request
            .get('/api/dashboard/protocol-list/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body).to.have.property('status', expectedStatus);
        expect(response.body).to.have.property('message', expectedMessage);
    });

    it('should return a failed response with error code 500 when Bearer Token is not provided', async function () {

        const expectedMessage = 'Forbidden';

        const response = await request
            .get('/api/dashboard/protocol-list/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer token`)
            .expect(403)

        expect(response.body).to.have.property('message', expectedMessage);
    });

});

describe("GET /api/dashboard/user-source-country/read", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it('should return a success response with status code 200', async function () {

        const expectedStatus = '1';
        const expectedMessage = 'User Source Country List Found Successfully';

        const response = await request
            .get('/api/dashboard/user-source-country/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body).to.have.property('status', expectedStatus);
        expect(response.body).to.have.property('message', expectedMessage);
    });

    it('should return a failed response with error code 500 when Bearer Token is not provided', async function () {

        const expectedMessage = 'Forbidden';

        const response = await request
            .get('/api/dashboard/user-source-country/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer token`)
            .expect(403)

        expect(response.body).to.have.property('message', expectedMessage);
    });

});

describe("GET /api/dashboard/user-destination-country/read", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it('should return a success response with status code 200', async function () {

        const expectedStatus = '1';
        const expectedMessage = 'User Destination Country List Found Successfully';

        const response = await request
            .get('/api/dashboard/user-destination-country/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body).to.have.property('status', expectedStatus);
        expect(response.body).to.have.property('message', expectedMessage);
    });

    it('should return a failed response with error code 500 when Bearer Token is not provided', async function () {

        const expectedMessage = 'Forbidden';

        const response = await request
            .get('/api/dashboard/user-destination-country/read')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer token`)
            .expect(403)

        expect(response.body).to.have.property('message', expectedMessage);
    });

});