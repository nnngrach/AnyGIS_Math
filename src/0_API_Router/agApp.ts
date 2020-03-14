import express from "express";

import AgHttpHeadController from "../1_Controlles/agHttpHandlerController";
import AgMathController from "../1_Controlles/agMathController";


class AgApp {

    expressApp = express();
    port = 3000;

    // Sub modules
    agHttpHeadController = new AgHttpHeadController();
    agMathController = new AgMathController();


    constructor() {
        this.setupApiRouter();
    }


    private setupApiRouter() {

        // Index - IDE web page

        this.expressApp.get("/", (req, res) => {
            res.render("ide", {title: "Web IDE"});
        });



        // Helping module for IDE

        this.expressApp.get("/helpers", (req, res) => {
            const result = this.agHttpHeadController.ping();
            res.status(200).send(result);
        });


        this.expressApp.get("/helpers/head/:urlInBase64", (req, res) => {
            const urlInBase64: string = req.params.urlInBase64;
            if (!urlInBase64) {return res.status(400).send("Wrong URL parameters");}

            const statusPromise =  this.agHttpHeadController.head(urlInBase64);

            statusPromise.then(function (statusText) {
                    res.send(statusText);
                });
        });



        // URL templates Math transforming module

        this.expressApp.get("/math", (req, res) => {
            const result = this.agMathController.ping();
            res.status(200).send(result);
        });


        this.expressApp.get("/math/:urlInBase64", (req, res) => {
            const urlInBase64: string = req.params.urlInBase64;
            if (!urlInBase64) {return res.status(400).send("Wrong URL parameters");}

            const result =  this.agMathController.processUrlTemplate(urlInBase64);

            res.status(200).send(result);
        });

    }

}

export default AgApp;