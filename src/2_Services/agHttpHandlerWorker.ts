import axios from "axios";


class AgHttpHandlerWorker {


    public async head(checkingUrl: string): Promise<string> {

        return axios.get(checkingUrl)
            .then(function (response) {
                // handle success
                return String(response.status + " " + response.statusText);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return error.toString();
            });
    }



    // TODO: Http proxy (get with referer)
    // public proxyGet() {
    //
    // }


}


export default AgHttpHandlerWorker;