import AgHttpError  from "../utils/agHttpError";
import AgHttpHeadController from "./agHttpHandlerController";
import AgMathController from "./agMathController";

class AgGetTileFacade {

    agMath = new AgMathController();



    getTile(paramsInBase64: string) {

        // fast check input data
        // get processed Url with Math

        try {
            this.agMath.processUrlTemplate(paramsInBase64);

            // if don't need a proxy then return redirect text
            // else download image with referer with HttpHelper module

        } catch (e) {
            throw e;
        }



    }

}

export default  AgGetTileFacade;