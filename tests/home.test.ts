// @ts-ignore
import request from "supertest";
import app from "../src/0_API_Router/app";

describe("GET /", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/")
            .expect(200, done);
    });
});
