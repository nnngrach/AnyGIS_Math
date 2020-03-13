import AgHttpHandlers from "../2_Services/agHttpHandlers";


class AgHttpHeadController {

    agHttpHandlers = new AgHttpHandlers();


    public ping() {
        return "Helper module is working";
    }

    public head(str: string) {
        const result = this.agHttpHandlers.head(str);
        return result + str;
    }
}


export default AgHttpHeadController;