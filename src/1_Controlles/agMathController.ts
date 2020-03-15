import { MathDto, TileNumbers } from "../3_Models/agTypes";
import AgDecoder from "../utils/agDecoder";
import AgHttpError  from "../utils/agHttpError";
import AgMathHandler from "../2_Services/agMathHandler";



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

        // latlon to tile numvers if it needed
        const checkedTileNumbers = this.parseCoordinates(dto.tileNumbers);
        dto.tileNumbers = checkedTileNumbers;

        const result = this.agMathHandler.replaceAllPlaceholders(dto);
        return result;
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


    // X,Y can be and TileNumbers and LatLon
    private parseCoordinates(jsonObject: object): TileNumbers {
        const obj = jsonObject as any;

        if (obj.x.includes(".") || obj.x.includes(".")) {

            const lat = parseFloat(obj.x);
            const lon = parseFloat(obj.y);
            const z = parseInt(obj.z, 10);
            return this.agMathHandler.latlonToTileNum(lat,  lon, z);

        } else {

            return {
                x: parseInt(obj.x, 10),
                y: parseInt(obj.y, 10),
                z: parseInt(obj.z, 10)
            };
        }
    }

}

export default  AgMathController;