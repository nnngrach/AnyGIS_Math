import express from "express";
import { Application } from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import path from "path";

import AgHttpHeadController from "../1_Controlles/agHttpHeadController";


class AgApp {

    public port: number;

    expressApp = express();
    projectDir = path.join(__dirname, "../");

    agHttpHeadController: AgHttpHeadController = new AgHttpHeadController();

    constructor(port: number) {
        this.port = port;
        this.expressApp.set("port", this.port);
        this.expressApp.set("views", path.join(this.projectDir, "../views"));
        this.expressApp.set("view engine", "pug");

        this.setupMiddleware();
        this.setupApiRouter();
    }


    public listen() {
        this.expressApp.listen(this.port, () => {
            console.log(`AgApp listening on the http://localhost:${this.port}`);
            console.log(
                "  AgApp is running at http://localhost:%d in %s mode",
                this.expressApp.get("port"),
                this.expressApp.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }


    private setupMiddleware() {
        this.expressApp.use(compression());
        this.expressApp.use(errorHandler());       // remove for production
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(
            express.static(path.join(this.projectDir, "assets"), { maxAge: 31557600000 })
        );
    }



    private setupApiRouter() {

        this.expressApp.get("/", (req, res) => {
            res.render("ide", {title: "Web IDE"});
        });


        this.expressApp.get("/helpers", (req, res) => {
            const result = this.agHttpHeadController.ping();
            res.status(200).send(result);
        });


        this.expressApp.get("/helpers/head/:strParam", (req, res) => {
            const strParam: string = req.params.strParam;
            if (!strParam) {return res.status(400).send("Wrong URL parameters");}

            const result = this.agHttpHeadController.head(strParam);
            res.send(result);
        });

    }

}

export default AgApp;