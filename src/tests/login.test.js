// import supertest from "supertest";
// import app from "../app.js";
// const request = supertest(app);
// import { expect } from "chai";

// const validCredentials = {
//     email: "alie@yopmail.com",
//     password: "alie"
// }
// const invalidUserCredentials = {
//     email: "johndoe@gmail.com",
//     password: "321"
// }

// let token;

// describe("POST /api/admin/login", function () {

//     it("shoudld return token with 200 when valid credentials are given", async function () {
//         const response = await request
//             .post("/api/admin/login")
//             .send(validCredentials);

//         token = response.body.token;
//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Successfully Logged In");
//     });

//     it('should return a 400 status code with message when invalid email or password is provided', async () => {
//         const response = await request.post("/api/admin/login")
//             .send(invalidUserCredentials)

//         expect(response.status).to.be.eql(400);
//         expect(response.body.message).to.be.eql("Invalid Credentials");
//     });
// });
