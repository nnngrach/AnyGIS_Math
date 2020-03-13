import request from "supertest";
import AgApp from "../src/0_API_Router/agApp";
const app = new AgApp(3000);
const expressApp = app.expressApp;


describe("GET /", () => {
    it("should return 200 OK", (done) => {
        request(expressApp).get("/")
            .expect(200, done);
    });
});
