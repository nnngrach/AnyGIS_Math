import { Base64 } from "js-base64";


class AgDecoder {

    static stringToBase64(text: string): string {
        return Base64.encode(text);
    }

    static base64ToString(text: string): string {
        return Base64.decode(text);
    }

    static jsonToBase64(obj: object): string {
        return this.stringToBase64( JSON.stringify(obj) );
    }

    static base64ToJson(text: string): object {
        return JSON.parse( this.base64ToString(text) );
    }
}


export default AgDecoder;