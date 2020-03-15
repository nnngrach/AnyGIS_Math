import { expect } from "chai";
import AgMathHandler from "../src/2_Services/agMathHandler";
import {TileNumbers, MathDto} from "../src/3_Models/agTypes";


describe("Math calculation handler", function() {

    const agMathHandler = new AgMathHandler();

    // reference values
    const x = 618;
    const y = 319;
    const z = 10;
    const tileNums: TileNumbers = {x: x, y: y, z: z};
    const lat = 55.97379;
    const lon = 37.26563;
    // const coordinates = {lat: lat, lon: lon, z: z};
    const emptyDto: MathDto = {scripts: "", serverNames: "", tileNumbers: {x: 0, y: 0, z: 0}, urlTemplate: ""};



    it("should transform Latitude and Longitude to XYZ tile numbers", function() {
        const result = agMathHandler.latlonToTileNum(lat, lon, z);
        expect(result).to.eql(tileNums);
    });


    it("should transform XYZ tile number to Latitude and Longitude", function() {
        const result = agMathHandler.tilenumToLatlon(x, y, z);
        const testingLat = Math.floor(result.lat * 100);
        const testingLon = Math.floor(result.lon * 100);
        const referenceLat = Math.floor(lat * 100);
        const referenceLon = Math.floor(lon * 100);

        expect(testingLat).equal(referenceLat);
        expect(testingLon).equal(referenceLon);
    });


    it("should return one of serverNames from list", function() {
        const testingDto = emptyDto;
        testingDto.urlTemplate = "{s}";
        testingDto.serverNames = "a;a;a";

        const result = agMathHandler.replaceAllPlaceholders(testingDto);
        expect(result).equal("a");
    });


    it("should return sub folder numbers for SasPlanet cache format", function() {
        const testingDto = emptyDto;
        testingDto.tileNumbers = {x: 5061, y: 3002, z: 13};
        testingDto.urlTemplate = "http://91.237.82.95:8088/pub/tourism/hr_elbrus/z{z+1}/{x/1024}/x{x}/{y/1024}/y{y}.jpg";
        const reference = "http://91.237.82.95:8088/pub/tourism/hr_elbrus/z14/4/x5061/2/y3002.jpg";

        const result = agMathHandler.replaceAllPlaceholders(testingDto);
        expect(result).equal(reference);
    });


    it("should return inverted Y tile number", function() {
        const testingDto = emptyDto;
        testingDto.urlTemplate = "{-y}";
        testingDto.tileNumbers = {x: 2531, y: 1501, z: 12};

        const result = agMathHandler.replaceAllPlaceholders(testingDto);
        expect(result).equal("2594");
    });


    it("should return Bbox", function() {
        const testingDto = emptyDto;
        testingDto.urlTemplate = "{bbox}";
        testingDto.tileNumbers = {x: 618, y: 319, z: 10};
        const reference = "4148390.399093084,7514065.628545966,4187526.157575097,7553201.387027975";

        const result = agMathHandler.replaceAllPlaceholders(testingDto);
        expect(result).equal(reference);
    });


});