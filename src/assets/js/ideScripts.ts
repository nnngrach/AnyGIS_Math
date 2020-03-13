type tileNumbers = {x: string, y: string, z: string};
type mathDto = {tileNumbers: tileNumbers, urlTemplate: string, serverNames: string, scripts: string};

const xID = "X";
const yID = "Y";
const zID = "Z";
const urlID = "URL";
const sID = "ServerNames";
const scriptsID = "Scripts";
const httpResDivID = "httpRes";
// const imageID = "TileImage";



// ***
// * Current state
// ***

let xValue = "0";
let yValue = "0";
let zValue = "0";
let urlTemplateValue = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
let sValue = "a;b;c";
let scriptsValue = "";
// let processedImageUrl = "https://a.tile.opentopomap.org/1/1/1.png";             //(?)
//let processedImageUrl = "https://a.tile.opentopoMMMap.org/1/1/1.png";             //(?)
let processedImageUrl = "https://heatmap-external-b.strava.com/tiles-auth/run/hot/8/164/77.png?px=256";             //(?)
let httpResValue = "";




// ***
// * Click for Check button
// ***

function checkIt(): void {
    console.log("Checking...");

    fetchUIValues();
    changeImage();
}




// ***
// * Set UI to default values
// ***

function updateUIValues(): void {
    (document.getElementById(xID) as HTMLInputElement).value  = xValue;
    (document.getElementById(yID) as HTMLInputElement).value  = yValue;
    (document.getElementById(zID) as HTMLInputElement).value  = zValue;
    (document.getElementById(sID) as HTMLInputElement).value  = sValue;

    document.getElementById(urlID).textContent = urlTemplateValue;
    document.getElementById(scriptsID).textContent = scriptsValue;
}



// ***
// * Fetch values from UI
// ***

function fetchUIValues(): void {
    console.log("fetchUItValues");

    xValue = (document.getElementById(xID) as HTMLInputElement).value;
    yValue = (document.getElementById(yID) as HTMLInputElement).value;
    zValue = (document.getElementById(zID) as HTMLInputElement).value;
    sValue = (document.getElementById(sID) as HTMLInputElement).value;

    urlTemplateValue = document.getElementById(urlID).textContent;
    scriptsValue = document.getElementById(scriptsID).textContent;
}





// ***
// * Replace tile image and text with Html status code
// ***

function changeImage(): void {
    const dto: mathDto = {tileNumbers: {x: xValue, y: yValue, z: zValue},  urlTemplate: urlTemplateValue, serverNames: sValue, scripts: scriptsValue};
    const processedUrl = mathUrlTemplate(dto);
    const httpStatusText = getImageHttpStatus(processedUrl);
    replaceImageHtml(processedUrl, httpStatusText);
}

function mathUrlTemplate(mathDto: mathDto): string {
    return "processed URL Mock"
}

function getImageHttpStatus(imageUrl: string): string {
    return "image Html status Mock"
}

function replaceImageHtml(imageUrl: string, httpStatusText: string): void {
    //document.getElementById(httpResDivID).innerHTML = '<img src="' + processedImageUrl + '">';
    document.getElementById(httpResDivID).innerHTML = '<img src="' + imageUrl + '">' + httpStatusText;
}






// ***
// * After page first loading
// ***

updateUIValues();
changeImage();