const xID = "X";
const yID = "Y";
const zID = "Z";
const urlID = "URL";
const sID = "ServerNames";
const scriptsID = "Scripts";
const httpResDivID = "httpRes";
// const imageID = "TileImage";


// Current state
let xValue = "0";
let yValue = "0";
let zValue = "0";
let urlTemplateValue = "https://a.tile.opentopomap.org/0/0/0.png";
let sValue = "a;b;c";
let scriptsValue = "";
// let processedImageUrl = "https://a.tile.opentopomap.org/1/1/1.png";             //(?)
//let processedImageUrl = "https://a.tile.opentopoMMMap.org/1/1/1.png";             //(?)
let processedImageUrl = "https://heatmap-external-b.strava.com/tiles-auth/run/hot/8/164/77.png?px=256";             //(?)
let httpResValue = "qweqweqweqweqeqweqwe";



function updateUIValues(): void {
    console.log("setDefaultValues");

    (document.getElementById(xID) as HTMLInputElement).value  = xValue;
    (document.getElementById(yID) as HTMLInputElement).value  = yValue;
    (document.getElementById(zID) as HTMLInputElement).value  = zValue;
    (document.getElementById(sID) as HTMLInputElement).value  = sValue;

    document.getElementById(urlID).textContent = urlValue;
    document.getElementById(scriptsID).textContent = scriptsValue;


    document.getElementById(httpResDivID).innerHTML = '<img src="' + processedImageUrl + '">';
    //document.getElementById(httpResDivID).innerHTML = '<img src="' + processedImageUrl + '">' + httpResValue;

}


function check(): void {
    console.log("Check");
}





updateUIValues();