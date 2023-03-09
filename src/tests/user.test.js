// package
import { expect } from "chai";
import { loginUser } from "../controllers/user.controller.js"

describe("POST api/users/login", () => {
    it("should return successfull response with auth token in string", () => {
        const request = {};
        const response = {
            status: (statusCode) => {
                expect(statusCode).to.equal(200);
                return {
                    send: (data) => {
                        expect(data).to.have.property("success").to.equal("response successfull");
                        expect(data).to.have.property("message").to.equal("authentication successfull");
                        expect(data).to.have.property("action").to.equal("user successfully logged in");
                        expect(data).to.have.property("token").to.be.a("string");

                    }
                }
            }
        };
        loginUser(request, response)
    })
})