import express from "express";
import { Application } from 'express'
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import path from "path";
//import {Application} from "@types/express";

// Controllers (route handlers)
import * as ideRouter from "../1_Sub_Routers/ideRouter";
// import helpersRouter from "../1_Sub_Routers/helpersRouter";
import HelpersRouter from "../1_Sub_Routers/helpersRouter";


class App {

    // private static app: App;
    // public static getInstance(): App {
    //     return App.app;
    // }

    public expresApp: Application;

    public port: number;
    // public port = 3000;
    public projectDir: string;

    private helpersRouter: HelpersRouter;


    constructor(port: number) {
        console.log("Constructor ==========")

        this.expresApp = express();
        this.port = port;
        this.projectDir = path.join(__dirname, "../");

        //this.app.set("port", process.env.PORT || 3000);
        this.expresApp.set("port", this.port);
        this.expresApp.set("views", path.join(this.projectDir, "../views"));
        this.expresApp.set("view engine", "pug");

        this.setupMiddleware();
        this.setupApiRouter();

        // this.listen()

        // App.app = this;
    }


    public listen() {
        this.expresApp.listen(this.port, () => {
            // console.log(`App listening on the http://localhost:${this.port}`)
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                this.expresApp.get("port"),
                this.expresApp.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        })
    }


    private setupMiddleware() {
        this.expresApp.use(compression());
        this.expresApp.use(errorHandler());       // remove for production
        this.expresApp.use(bodyParser.json());
        this.expresApp.use(bodyParser.urlencoded({ extended: true }));
        this.expresApp.use(
            express.static(path.join(this.projectDir, "assets"), { maxAge: 31557600000 })
        );

        // this. app.use((req, res, next) => {
        //     res.locals.user = req.user;
        //     next();
        // });
    }



    private setupApiRouter() {
        //this.helpersRouter = new HelpersRouter();
        // helpersRouter.mount(this.app);

        let router: express.Router;
        router = express.Router();
        this.helpersRouter = new HelpersRouter();

        this.expresApp.get("/", ideRouter.index);

        this.expresApp.get("/helpers", this.helpersRouter.aa);
        // this.expresApp.get("/helpers/:city", this.helpersRouter.bb);
        this.expresApp.get("/helpers/:strParam/:numParam/:floatParam", this.helpersRouter.head);
    }

}

export default App






/*

// Create Express server
const app = express();


// Express configuration
const projectDir = path.join(__dirname, "../");
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(projectDir, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(
    express.static(path.join(projectDir, "assets"), { maxAge: 31557600000 })
);

*/






/**
 * Main API Router
 */


/*


app.get("/", ideRouter.index);

app.use("/helpers", router);


export default app;


 */