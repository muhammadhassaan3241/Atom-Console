import supertest from "supertest";
import app from "../app.js";
const request = supertest(app);
import { expect } from "chai";
import vpnAccountManagementServices from "../services/vpn-account-management.services.js";

const validCredentials = {
    email: "alie@yopmail.com",
    password: "alie"
}

let token;

describe("GET /api/vpn/vpn-users/users", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it("should return token with 200 when valid credentials are given", async function () {
        const response = await request
            .post("/api/vpn/vpn-users/users")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("VPN Account Users Found Successfully");
        expect(response.body.data).to.be.an("array");

    });

    it("should return token with 404 when invalid reseller id is given", async function () {
        //  Mock invalid reseller ID
        const reseller_Id = 123;

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'VPN Account Users Not Found';
        const statusCode = 404;
        const customStatus = '0';
        const originalMethod = vpnAccountManagementServices.getVpnUsers;
        vpnAccountManagementServices.getVpnUsers = (resellerId = reseller_Id, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/vpn/vpn-users/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        vpnAccountManagementServices.getVpnUsers = originalMethod;

    });


});

describe("GET /api/vpn/vpn-users/inventory", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it("should return token with 200 when valid credentials are given", async function () {
        const response = await request
            .post("/api/vpn/vpn-users/inventory")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("VPN Account Inventory Found Successfully");
        expect(response.body.data).to.be.an("object");

    });

    it("should return token with 404 when invalid reseller id is given", async function () {
        //  Mock invalid reseller ID
        const reseller_Id = 123;

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'There Is An Error In Getting Inventory';
        const statusCode = 404;
        const customStatus = '0';
        const originalMethod = vpnAccountManagementServices.getVpnUserInventory;
        vpnAccountManagementServices.getVpnUserInventory = (resellerId = reseller_Id, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/vpn/vpn-users/inventory')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        vpnAccountManagementServices.getVpnUserInventory = originalMethod;

    });
});

describe("GET /api/vpn/vpn-users/create", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it("should return token with 200 when valid credentials are given", async function () {
        const response = await request
            .post("/api/vpn/vpn-users/create")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("VPN Account Created Successfully");
        expect(response.body.data).to.be.an("object");

    });

    it("should return token with 404 when invalid reseller id is given", async function () {
        //  Mock invalid reseller ID
        const reseller_Id = 123;

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'VPN Account Not Created';
        const statusCode = 404;
        const customStatus = '0';
        const originalMethod = vpnAccountManagementServices.createVpnUser;
        vpnAccountManagementServices.createVpnUser = (resellerId = reseller_Id, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/vpn/vpn-users/create')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        vpnAccountManagementServices.createVpnUser = originalMethod;

    });
});

describe("GET /api/vpn/vpn-users/enable-or-disbable", function () {

    before(async () => {
        const response = await request
            .post("/api/admin/login")
            .send(validCredentials);

        token = response.body.token;
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("User Successfully Logged In");
    })

    it("should return status 200 when action 'enable' is given", async function () {
        //  Mock invalid reseller ID
        const enableAccount = "enable";

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'VPN Account Enabled Successfully';
        const statusCode = 200;
        const customStatus = '1';
        const originalMethod = vpnAccountManagementServices.enable_disableVpnUser;
        vpnAccountManagementServices.enable_disableVpnUser = (resellerId, action = enableAccount, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/vpn/vpn-users/enable-or-disbable')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        vpnAccountManagementServices.enable_disableVpnUser = originalMethod;

    });

    it("should return status 200 when action 'disable' is given", async function () {
        //  Mock invalid reseller ID
        const enableAccount = "disable";

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'VPN Account Disabled Successfully';
        const statusCode = 200;
        const customStatus = '1';
        const originalMethod = vpnAccountManagementServices.enable_disableVpnUser;
        vpnAccountManagementServices.enable_disableVpnUser = (resellerId, action = enableAccount, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/vpn/vpn-users/enable-or-disbable')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        vpnAccountManagementServices.enable_disableVpnUser = originalMethod;

    });


    it("should return token with 404 when invalid reseller id is given", async function () {
        //  Mock invalid reseller ID
        const reseller_Id = 123;

        // Stub Dashboard.getMonthlyConnectedUsers method to return error response
        const errorMessage = 'VPN Account Not Created';
        const statusCode = 404;
        const customStatus = '0';
        const originalMethod = vpnAccountManagementServices.createVpnUser;
        vpnAccountManagementServices.createVpnUser = (resellerId = reseller_Id, callback) => {
            callback([], statusCode, customStatus, errorMessage);
        };

        // Make request to API endpoint
        const response = await request
            .get('/api/vpn/vpn-users/enable-or-disbable')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)


        // Check response body
        expect(response.body).to.have.property('status', customStatus);
        expect(response.body).to.have.property('message', errorMessage);

        // Restore original method
        vpnAccountManagementServices.createVpnUser = originalMethod;

    });
})

