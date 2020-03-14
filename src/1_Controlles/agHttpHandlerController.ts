import { Base64 } from "js-base64";
import AgHttpHandlerWorker from "../2_Services/agHttpHandlerWorker";



class AgHttpHandlerController {

    private agHttpHandlers = new AgHttpHandlerWorker();


    public ping(): string {
        return "Helper module is working";
    }

    public async head(base64Url: string): Promise<string> {
        const checkingUrl = Base64.decode(base64Url);
        return await this.agHttpHandlers.head(checkingUrl);
    }


}


export default AgHttpHandlerController;