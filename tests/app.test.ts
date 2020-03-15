import request from "supertest";
import AgServer from "../src/0_API_Router/agServer";

const agServer = new AgServer();
const expressApp = agServer.app.expressApp;

describe("GET /random-url", () => {

    it("should return 404", (done) => {
        request(expressApp).get("/reset")
            .expect(404, done);
    });

});
;