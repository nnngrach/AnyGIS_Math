type mathDTO = {tileNumbers: {x: string; y: string; z: string}; urlTemplate: string; serverNames: string; scripts: string};

const mathProcessorUrl = "/math/url/";
const httpStatusCheckerUrl = "/helpers/head/";


const xID = "X";
const yID = "Y";
const zID = "Z";
const urlID = "URL";
const sID = "ServerNames";
const scriptsID = "Scripts";
const httpResDivID = "HttpRes";




// ***
// * Current state
// ***

let xValue = "0";
let yValue = "0";
let zValue = "0";
let urlTemplateValue = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
let sValue = "a;b;c";
let scriptsValue = "";
// const httpResValue = "";





// ***
// * Helping functions
// ***

function httpGet(url: string): any {
    const x = new XMLHttpRequest();
    x.open("GET", url, false);
    x.send(null);
    return x.response;
}

function httpGetResponseText(url: string): string {
    const x = new XMLHttpRequest();
    x.open("GET", url, false);
    x.send(null);
    return x.responseText;
}

function stringToBase64(text: string): string {
    return window.btoa(unescape(encodeURIComponent(text)));
}

function base64ToString(text: string): string {
    return decodeURIComponent(escape(window.atob(text)));
}

function jsonToBase64(object: object): string {
    const text = JSON.stringify(object);
    return stringToBase64(text);
}

function base64ToJson(text: string): object {
    const decodedText = base64ToString(text);
    return JSON.parse(decodedText);
}




// ***
// * IDE Http requests
// ***

function httpGetProcessedURL(mathParamsDto: mathDTO): string {
    const dtoAsBase64 = jsonToBase64(mathParamsDto);
    const requestUrl = mathProcessorUrl +  dtoAsBase64;
    return httpGetResponseText(requestUrl);
}


function httpGetTileStatusCode(tileUrl: string) {
    const tileUrlInBase64 = stringToBase64(tileUrl);
    const checkingRequestUrl = httpStatusCheckerUrl +  tileUrlInBase64;
    return httpGetResponseText(checkingRequestUrl);
}




// ***
// * Get/Set UI  values
// ***

function setUIDefaultValues(): void {
    (document.getElementById(xID) as HTMLInputElement).value  = xValue;
    (document.getElementById(yID) as HTMLInputElement).value  = yValue;
    (document.getElementById(zID) as HTMLInputElement).value  = zValue;
    (document.getElementById(sID) as HTMLInputElement).value  = sValue;

    document.getElementById(urlID).textContent = urlTemplateValue;
    document.getElementById(scriptsID).textContent = scriptsValue;
}


function getUIValues(): void {
    xValue = (document.getElementById(xID) as HTMLInputElement).value;
    yValue = (document.getElementById(yID) as HTMLInputElement).value;
    zValue = (document.getElementById(zID) as HTMLInputElement).value;
    sValue = (document.getElementById(sID) as HTMLInputElement).value;

    urlTemplateValue = document.getElementById(urlID).textContent;
    scriptsValue = document.getElementById(scriptsID).textContent;
}


function replaceHtmlForTileImageAndStatusCode(imageUrl: string, httpStatusText: string): void {
    document.getElementById("HttpRes").innerHTML = "<img src=\"" + imageUrl + "\">" + httpStatusText;
}






// ***
// * Update tile image and text with Html status code
// ***

function changeImage(): void {
    const dto: mathDTO = {tileNumbers: {x: xValue, y: yValue, z: zValue},  urlTemplate: urlTemplateValue, serverNames: sValue, scripts: scriptsValue};
    const processedTileUrl = httpGetProcessedURL(dto);
    const tileLoadingHttpStatusText = httpGetTileStatusCode(processedTileUrl);
    replaceHtmlForTileImageAndStatusCode(processedTileUrl, tileLoadingHttpStatusText);
}




// ***
// * Clicking for Check button
// ***

function checkTileDownloadingWithUIParametes(): void {
    getUIValues();
    changeImage();
}




// ***
// * After page first loading
// ***

setUIDefaultValues();
// changeImage();