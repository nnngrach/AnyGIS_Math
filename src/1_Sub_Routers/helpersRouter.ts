import express = require("express");
import { Router, Request, Response } from "express";
import App from "../0_API_Router/app";
// import { Request, Response,  Router } from "@types/express";



class HelperRouter {

    constructor() {}


    public head(req: Request, res: Response) {

        const strParam: string = req.params.strParam;
        const numParam: number = parseInt(req.params.numParam, 10);
        const floatParam: number = parseFloat(req.params.floatParam);

        if (!strParam || !numParam || ! floatParam) {
            return res.status(400).send("Head with wrong params");
        }


        console.log("================  ", strParam, numParam);

        

        // return res.status(200).send("HEAD");
        return res.status(200).send("HEAD: " + strParam + numParam + floatParam);
    }



    // // Вспомогательные функции
    //
    // public isInt<T>( value: T ) {
    //     let x = parseFloat( value )
    //     return !isNaN( value ) && ( x | 0 ) === x
    // }
    //
    //
    // public error( status, msg ) {
    //     var err = new Error( msg )
    //     err.status = status
    //     return err
    // }





    public aa(req: Request, res: Response) {

        return res.status(200).send("AAAAA");
    }


    public bb(req: Request, res: Response) {

        const city: string = req.params.city;
        return res.status(200).send(city);
    }



        // public city() {
    //     console.log("city");
    //     console.log(this.router);
    //
    //     this.router.get("/:city", (req: Request, res: Response) => {
    //         const city: string = req.params.city;
    //         if (!city) {
    //             return res
    //                 .status(400)
    //                 .json({
    //                     error: true,
    //                     messsage: "city name should be filled :("
    //                 });
    //         }
    //         let result: { degree: string; status: string };
    //         let resultNotFound: boolean = false;
    //         switch (city.toLowerCase()) {
    //             case "nyc":
    //                 result = { degree: "18C", status: "foggy" };
    //                 break;
    //             case "stockholm":
    //                 result = { degree: "8C", status: "windy" };
    //                 break;
    //             case "san-francisco":
    //                 result = { degree: "14C", status: "rainy" };
    //                 break;
    //             case "tokyo":
    //                 result = { degree: "21C", status: "sunny" };
    //                 break;
    //             default:
    //                 resultNotFound = true;
    //         }
    //         if (resultNotFound) {
    //             return res.json({
    //                 error: true,
    //                 messsage: "city name not found in DB :("
    //             });
    //         }
    //         else {
    //             return res.json(result);
    //         }
    //     });
    // }
}

export default HelperRouter;


//
//
// const router = express.Router();
//
// /**
//  * GET /helpers/httphead
//  * Home page.
//  */
//
// // create get method which will return city weather status.
// router.get("/:city", (req: Request, res: Response) => {
//     const city: string = req.params.city;
//     if (!city) {
//         return res
//             .status(400)
//             .json({
//                 error: true,
//                 messsage: "city name should be filled :("
//             });
//     }
//     let result: { degree: string; status: string };
//     let resultNotFound: boolean = false;
//     switch (city.toLowerCase()) {
//         case "nyc":
//             result = { degree: "18C", status: "foggy" };
//             break;
//         case "stockholm":
//             result = { degree: "8C", status: "windy" };
//             break;
//         case "san-francisco":
//             result = { degree: "14C", status: "rainy" };
//             break;
//         case "tokyo":
//             result = { degree: "21C", status: "sunny" };
//             break;
//         default:
//             resultNotFound = true;
//     }
//     if (resultNotFound) {
//         return res.json({
//             error: true,
//             messsage: "city name not found in DB :("
//         });
//     }
//     else {
//         return res.json(result);
//     }
// });
//
// export default router;
//
//
