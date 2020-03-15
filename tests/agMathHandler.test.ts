import { expect } from "chai";
import AgMathHandler from "../src/2_Services/agMathHandler";
import {TileNumbers} from "../src/3_Models/agTypes";

describe("Math calculation handler", function() {

    const agMathHandler = new AgMathHandler();

    // reference values
    const x = 618;
    const y = 319;
    const z = 10;
    const tileNums: TileNumbers = {x: x, y: y, z: z};
    const lat = 55.8853;
    const lon = 37.57949;
    const coordinates = {lat: lat, lon: lon, z: z};


    it("should transform Latitude and Longitude to XYZ tile number", function() {
        const result = agMathHandler.latlonToTileNum(lat, lon, z);
        expect(result).to.eql(tileNums);
        // expect(result).equal(tileNums);
    });

});