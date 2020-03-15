import express from "express";
import compression from "compression";
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import path from "path";

import AgRouter from "./agRouter";



class AgServer {

    app = new AgRouter();
    private port = Number(process.env.PORT || 3000);
    private projectDir = path.join(__dirname, "../");


    constructor() {
        this.serverPrimarySetup();
        this.serverSetupMiddleware();
    }

    private serverPrimarySetup() {
        this.app.expressApp.set("port", this.port);
        this.app.expressApp.set("views", path.join(this.projectDir, "../views"));
        this.app.expressApp.set("view engine", "pug");
    }

    private serverSetupMiddleware() {
        this.app.expressApp.use(errorHandler());       // remove for production
        this.app.expressApp.use(compression());
        this.app.expressApp.use(bodyParser.json());
        this.app.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.app.expressApp.use(
            express.static(path.join(this.projectDir, "assets"), { maxAge: 31557600000 })
        );
    }

    public start() {
        this.app.expressApp.listen(this.app.port, () => {
            console.log(`AgApp listening on the http://localhost:${this.app.port}`);
            console.log(
                "  AgRouter is running at http://localhost:%d in %s mode",
                this.app.expressApp.get("port"),
                this.app.expressApp.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }

}


export default AgServer;