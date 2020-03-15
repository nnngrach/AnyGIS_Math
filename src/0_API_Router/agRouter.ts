import express from "express";

import AgHttpError  from "../utils/agHttpError";
import AgHttpHeadController from "../1_Controlles/agHttpHandlerController";
import AgMathController from "../1_Controlles/agMathController";
import AgGetTileFacade from "../1_Controlles/agGetTileFacade";


class AgRouter {

    expressApp = express();
    port = 3000;

    // Sub modules
    agHttpHeadController = new AgHttpHeadController();
    agMathController = new AgMathController();
    agGetTileFacade = new AgGetTileFacade();


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


        this.expressApp.get("/math/url/:urlInBase64", (req, res) => {

            const urlInBase64: string = req.params.urlInBase64;
            if (!urlInBase64) {return res.status(400).send("Wrong URL parameters");}

            try {
                const result =  this.agMathController.processUrlTemplate(urlInBase64);
                res.status(200).send(result);
            } catch (e) {
                const error = e as AgHttpError;
                res.status(error.statusCode).send(error.message);
            }
        });




        // TODO: add  Get Tile method
        this.expressApp.get("/math/:urlInBase64", (req, res) => {

            const urlInBase64: string = req.params.urlInBase64;
            if (!urlInBase64) {return res.status(400).send("Wrong URL parameters");}

            try {
                const result =  this.agGetTileFacade.getTile(urlInBase64);
                res.status(200).send(result);
            } catch (e) {
                const error = e as AgHttpError;
                res.status(error.statusCode).send(error.message);
            }
        });


    }

}


export default AgRouter;