// import supertest from "supertest";
// import app from "../app.js";
// const request = supertest(app);
// import { expect } from "chai";

// const validCredentials = {
//     email: "alie@yopmail.com",
//     password: "alie"
// }
// const body = {
//     id: 88,
//     reseller_id: 641,
//     subscription: "",
//     parentkey: process.env.AUTH_SECRET_KEY,
//     firstname: "Steve",
//     lastname: "Rogers",
//     email: "steve@yopmail.com",
//     password: "rogers",
//     role: "Customer"
// }

// let token;

// describe("CRUD api/users/", function () {

//     before(async () => {
//         const response = await request
//             .post("/api/admin/login")
//             .send(validCredentials);

//         token = response.body.token;
//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Successfully Logged In");
//     })

//     it("should create user", async function () {
//         const response = await request
//             .post("/api/users/create")
//             .send(body)
//             .set("Content-Type", "application/json")
//             .set("Authorization", `Bearer ${token}`);


//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Created Successfully");
//     });

//     it("should get all users", async function () {
//         const response = await request
//             .get("/api/users/read")
//             .set("Authorization", `Bearer ${token}`);

//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("Users Found Successfully");
//     });

//     it("should get user by id", async function () {
//         const response = await request
//             .get(`/api/users/read/${body.id}`)
//             .set("Authorization", `Bearer ${token}`);

//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Found Successfully");
//     });

//     it("should update user by id", async function () {
//         const response = await request
//             .get(`/api/users/update/${body.id}`)
//             .send({ firstname: "Bob" })
//             .set("Authorization", `Bearer ${token}`);

//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Updated Successfully");
//     });

//     it("should delete user by id", async function () {
//         const response = await request
//             .get(`/api/users/delete/${body.id}`)
//             .set("Authorization", `Bearer ${token}`);

//         expect(response.status).to.eql(200);
//         expect(response.body.message).to.eql("User Deleted Successfully");
//     });

// });
