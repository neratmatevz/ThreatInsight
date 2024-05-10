const fs = require('fs');
const path = require('path');
/*
    Function reads the parameters that are JS object encoded 
    and recognizes the parameters important for the API call
    to the nmap API web service. The object is parsed from 
    the JSON that contains information about all the tools 
    for the scan.

    Function should be called only from the function that
    processes the JSON data from the "Run" on frontend.

    @param {Object} nmapJsonData - JS object containing parameters for the Nmap API call.
*/
const nmap = (nmapJsonData) => {

    //Supported request parameters
    let supportedRequestJSON;
    try{
        const supportedRequestJSONPath = path.join(__dirname, 'nmapSupportedRequest.json');
        supportedRequestJSON = fs.readFileSync(supportedRequestJSONPath , { encoding: 'utf8'});
    }catch(e){
        throw new Error(e);
    }
    const supportedRequestData = JSON.parse(supportedRequestJSON);
    const supportedRequestCommands = supportedRequestData.command;
    const supportedRequestScanType = supportedRequestData.scan_type;
    const supportedRequestSchedule = supportedRequestData.schedule;

    if (!nmapJsonData || !nmapJsonData.choosen) {
        throw new Error("Parameters for nmap not provided!");
    }

    //setup parameters for nmapAPIcall()
    const { scan_type, command, options, schedule, target, target_end } = nmapJsonData;

    //Check the correctness of all the parameters
    if (scan_type !== supportedRequestScanType) {
        throw new Error(`Scan type ${scan_type} is not supported!`);
    }

    if ((!supportedRequestCommands.includes(command)) || command === "") {
        throw new Error(`Command parameter ${command} is not supported!`);
    }

    if (options !== null && options !== undefined && options !== "") {
        throw new Error("Options parameter is not empty!");
    }

    if (schedule !== supportedRequestSchedule) {
        throw new Error(`Schedule ${schedule} is not supported!`);
    }

    if (!target || target.trim() === "") {
        throw new Error("Target cannot be empty!");
    }

    if (target_end !== null && target_end !== undefined && target_end !== "") {
        throw new Error("Target end parameter is not empty!");
    }

    //TODO: call the nmapAPIcall()
    //TODO: save the result to database 
    //TODO: return that the result is saved to database and search for this tool is over
}

module.exports = nmap;



