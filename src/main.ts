import AgApp from "./0_API_Router/agApp";

const port = Number(process.env.PORT || 3000);
const app = new AgApp(port);
app.listen();


