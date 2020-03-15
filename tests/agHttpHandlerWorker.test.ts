import request from "supertest";
import AgServer from "../src/0_API_Router/agServer";

const agServer = new AgServer();
const expressApp = agServer.app.expressApp;

const refererUrlInBase64 = "eyJ0aWxlTnVtYmVycyI6eyJ4IjoiMCIsInkiOiIwIiwieiI6IjAifSwidXJsVGVtcGxhdGUiOiJodHRwczovL3tzfS50aWxlLm9wZW50b3BvbWFwLm9yZy97en0ve3h9L3t5fS5wbmciLCJzZXJ2ZXJOYW1lcyI6ImE7YjtjIiwic2NyaXB0cyI6IiJ9";


// Integration
xdescribe("GET /helpers/head", () => {
    it("http head: should return 200 OK", (done) => {
        request(expressApp).get("/helpers/head/" + refererUrlInBase64)
            .expect(200, done);
    });
});


// Http proxy (get with referer)