import App from "./0_API_Router/app";

const port = Number(process.env.PORT || 3000);
const app = new App(port);
// const app = App.getInstance();
// app.expresApp.listen();
app.listen();


