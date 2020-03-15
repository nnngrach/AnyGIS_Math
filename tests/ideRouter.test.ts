import request from "supertest";
import AgServer from "../src/0_API_Router/agServer";

const agServer = new AgServer();
const expressApp = agServer.app.expressApp;


describe("GET /", () => {

    it("should return 200 OK", (done) => {
        request(expressApp).get("/")
            .expect(200, done);
    });

});
