//import { Base64 } from "js-base64";
import AgDecoder from "../utils/agDecoder";
import AgHttpHandlerWorker from "../2_Services/agHttpHandlerWorker";




class AgHttpHandlerController {

    private agHttpHandlers = new AgHttpHandlerWorker();


    public ping(): string {
        return "Helper module is working";
    }

    public async head(base64Url: string): Promise<string> {

        console.log("base64Url - ", base64Url);
        //const checkingUrl = Base64.decode(base64Url);
        const checkingUrl = AgDecoder.base64ToString(base64Url);

        console.log("checkingUrl - ", checkingUrl);

        return await this.agHttpHandlers.head(checkingUrl);
    }


}


export default AgHttpHandlerController;