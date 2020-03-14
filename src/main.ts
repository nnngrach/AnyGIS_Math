import express from "express";
import compression from "compression";
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import path from "path";

import AgApp from "./0_API_Router/agApp";


// Create Exrpess server

const app = new AgApp();
const port = Number(process.env.PORT || 3000);
const projectDir = __dirname;



// Setup Express server

function serverPrimarySetup() {
    app.port = port;
    app.expressApp.set("port", port);
    app.expressApp.set("views", path.join(projectDir, "../views"));
    app.expressApp.set("view engine", "pug");
}

function serverSetupMiddleware() {
    app.expressApp.use(compression());
    app.expressApp.use(errorHandler());       // remove for production
    app.expressApp.use(bodyParser.json());
    app.expressApp.use(bodyParser.urlencoded({ extended: true }));
    app.expressApp.use(
        express.static(path.join(projectDir, "assets"), { maxAge: 31557600000 })
    );
}

function serverListen() {
    app.expressApp.listen(app.port, () => {
        console.log(`AgApp listening on the http://localhost:${app.port}`);
        console.log(
            "  AgApp is running at http://localhost:%d in %s mode",
            app.expressApp.get("port"),
            app.expressApp.get("env")
        );
        console.log("  Press CTRL-C to stop\n");
    });
}



serverPrimarySetup();
serverSetupMiddleware();
serverListen();