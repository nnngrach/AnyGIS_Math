import {MathDto, TileNumbers, LatLon} from "../3_Models/agTypes";
import AgRandoms from "../utils/agRandoms";
import AgMathBingHandler from "../2_Services/agMathBingHandler";



// {q}          Номер тайла в системе QuadKey. (Как в картах Bing)




class AgMathHandler {

    private bingTransformer = new AgMathBingHandler()


    replaceAllPlaceholders(dto: MathDto): string {

        let result = dto.urlTemplate;

        result = result.replace("{x}", String(dto.tileNumbers.x));
        result = result.replace("{y}", String(dto.tileNumbers.y));
        result = result.replace("{z}", String(dto.tileNumbers.z));

        result = result.replace("{s}", this.getRandomServerName(dto.serverNames));

        result = result.replace("{q}", "{q}");
        result = result.replace("{-y}", this.getInvertedY(dto.tileNumbers));
        result = result.replace("{bbox}", this.getBBox(dto.tileNumbers));

        result = result.replace("{z+1}", String(dto.tileNumbers.z + 1));
        result = result.replace("{x/1024}", this.getSasFolder(dto.tileNumbers.x));
        result = result.replace("{y/1024}", this.getSasFolder(dto.tileNumbers.y));

        result = result.replace("{timeStamp}", this.getTimestamp());

        return result;
    }



    private getRandomServerName(serverNamesText: string): string {
        const serverNames = serverNamesText.split(";");
        return AgRandoms.randomArrayItem(serverNames);
    }


    private getSasFolder(tileNumber: number): string {
        return String( Math.floor(tileNumber / 1024) );
    }

    private getInvertedY(tileNumbers: TileNumbers): string {
       return String(Math.pow(2, tileNumbers.z) - tileNumbers.y - 1 );
    }


    private getBBox(tileNumbers: TileNumbers): string {
        const xPlanetDistance = 40075016.6855784878;
        const yPlanetDistance = 40075016.6855784804;
        const tileCountsPerZoom = Math.pow(2, tileNumbers.z);

        const left = xPlanetDistance/ tileCountsPerZoom * (tileNumbers.x) - xPlanetDistance / 2;
        const right = xPlanetDistance/ tileCountsPerZoom * (tileNumbers.x + 1) - xPlanetDistance / 2;
        const top = yPlanetDistance/ tileCountsPerZoom * (tileNumbers.y) - yPlanetDistance / 2;
        const bottom = yPlanetDistance/ tileCountsPerZoom * (tileNumbers.y + 1) - yPlanetDistance / 2;

        return `${ left },${ -bottom },${ right },${ -top }`;
    }
    


    // TODO: add QuadKey converter
    // private getQuadKey(tileNumbers: TileNumbers) {
    //
    // }





    // Functions with TimeStamp
    private getTimestamp(): string {
        return String(Date.now());
    }

    // TODO: add timestams fo last 10 minutes, 30, 60, day, month, and all months of the yesr

    
    // Coordinates processing
    public latlonToTileNum(lat: number, lon: number, z: number): TileNumbers {
        const xTile = Math.floor( (lon + 180) / 360 * Math.pow(2,z) );
        const yTile = Math.floor( (1 - Math.log( Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z)  );
        return {x: xTile, y: yTile, z: z};
    }

    public tilenumToLatlon(x: number, y: number, z: number): LatLon   {
        const n = Math.pow(2, z);
        const lon = (x / n) * 360 - 180;
        const lat = Math.atan( Math.sinh ( Math.PI - (y / n) * 2 * Math.PI)) * (180 / Math.PI);
        return {lat: lat, lon: lon, z: z};
    }
}

export default AgMathHandler;