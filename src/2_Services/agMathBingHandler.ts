// Source from:
// https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system


class AgMathBingHandler {

    private earthRadius = 6378137;
    private minLatitude = -85.05112878;
    private maxLatitude = 85.05112878;
    private minLongitude = -180
    private maxLongitude = 180;


    private clip(n: number, minValue: number, maxValue: number): number {
        return Math.min( Math.max(n, minValue),  maxValue );
    }

    public mapSize(levelOfDetail: number): number {
        return 256 << levelOfDetail;
    }

    public groundResolution(latitude: number, levelOfDetail: number): number {
        const clippedLantitude = this.clip(latitude, this.minLatitude, this.maxLatitude);
        return Math.cos(clippedLantitude * Math.PI / 180) * 2 * Math.PI * this.earthRadius / this.mapSize(levelOfDetail);
    }


    public mapScale(latitude: number, levelOfDetail: number, screenDpi: number): number {
        const ratio = 0.0254;
        return this.groundResolution(latitude, levelOfDetail) * screenDpi / ratio;
    }




}

export default AgMathBingHandler;