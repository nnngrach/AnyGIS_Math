import request from "supertest";
import AgServer from "../src/0_API_Router/agServer";

const agServer = new AgServer();
const expressApp = agServer.app.expressApp;


describe("Integration with submodules test", () => {

    describe("GET /", () => {
        it("should return 200 OK", (done) => {
            request(expressApp).get("/")
                .expect(200, done);
        });

    });


    describe("GET /random-url", () => {
        it("should return 404", (done) => {
            request(expressApp).get("/reset")
                .expect(404, done);
        });
    });



    describe("GET /helpers", () => {
        it("ping: should return 200 OK", (done) => {
            request(expressApp).get("/helpers")
                .expect(200, done);
        });
    });



    describe("GET /math", () => {
        it("ping: should return 200 OK", (done) => {
            request(expressApp).get("/math")
                .expect(200, done);
        });
    });

});




