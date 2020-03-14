// import { Base64 } from "js-base64";

import AgDecoder from "../utils/agDecoder";
import AgHttpError  from "../utils/agHttpError";

import AgMathHandler from "../2_Services/agMathHandler";
import { MathDto } from "../3_Models/agTypes";




class AgMathController {

    agMathHandler = new AgMathHandler();


    ping(): string {
        return "Math module is working";
    }


    processUrlTemplate(paramsInBase64: string): string {

        const decodedJsonObject = AgDecoder.base64ToJson(paramsInBase64);

        if (this.isInputDataincorrect(decodedJsonObject)) {
            throw new AgHttpError (400,"Input data incorrect");
        }

        const dto = decodedJsonObject as MathDto;


        // paramsObject Mock
        return "https://a.tile.opentopomap.org/1/1/0.png";
    }




    private isInputDataincorrect(jsonObject: object): boolean {
        const obj = jsonObject as any;

        // fields exists
        if (typeof obj.tileNumbers.x !== "string") {return true;}
        if (typeof obj.tileNumbers.y !== "string") {return true;}
        if (typeof obj.tileNumbers.z !== "string") {return true;}
        if (typeof obj.urlTemplate !== "string") {return true;}
        if (typeof obj.serverNames !== "string") {return true;}
        if (typeof obj.scripts !== "string") {return true;}

        // fields is type of Integer
        if (Number.isNaN( parseInt(obj.tileNumbers.x, 10))) {return true;}
        if (Number.isNaN( parseInt(obj.tileNumbers.x, 10))) {return true;}
        if (Number.isNaN( parseInt(obj.tileNumbers.x, 10))) {return true;}

        return false;
    }

}

export default  AgMathController;