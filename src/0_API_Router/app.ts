import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";

// Controllers (route handlers)
import * as ideRouter from "../1_Sub_Routers/ideRouter";


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




/**
 * API Router
 */
app.get("/", ideRouter.index);


// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//     res.redirect(req.session.returnTo || "/");
// });

export default app;
