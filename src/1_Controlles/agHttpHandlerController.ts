import AgDecoder from "../utils/agDecoder";
import AgHttpHandlerWorker from "../2_Services/agHttpHandlerWorker";


class AgHttpHandlerController {

    private agHttpHandlers = new AgHttpHandlerWorker();


    public ping(): string {
        return "Helper module is working";
    }

    public async head(base64Url: string): Promise<string> {
        const checkingUrl = AgDecoder.base64ToString(base64Url);
        return await this.agHttpHandlers.head(checkingUrl);
    }


}


export default AgHttpHandlerController;