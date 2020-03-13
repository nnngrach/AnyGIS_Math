import request from "supertest";
import AgApp from "../src/0_API_Router/agApp";
const app = new AgApp(3000);
const expressApp = app.expressApp;


describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(expressApp).get("/reset")
            .expect(404, done);
    });
});
