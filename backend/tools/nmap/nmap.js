const fs = require('fs');
const path = require('path');
const {nmapAPIcall, nmapAPIreport} = require('./nmapAPI');
const structureResponse = require('./nmapStructureResponse');
const saveStructuredResponse = require('./nmapSaveResponse');

/**
 * Reads the parameters encoded within a JavaScript
 * object and identifies the necessary parameters for
 * making an API call to the Nmap API web service. 
 * 
 * This function is intended to be exclusively invoked
 * by the function responsible for processing JSON data
 * resulting from the frontend "Run" action.
 * 
 * @param {Object} nmapJsonData - JavaScript object containing parameters required for the Nmap API call.
 * @returns {Object} - That the nmap scan is complete.
 */
const nmap = (nmapJsonData) => {

    //Supported request parameters
    let supportedRequestJSON;
    try {
        const supportedRequestJSONPath = path.join(__dirname, 'nmapSupportedRequest.json');
        supportedRequestJSON = fs.readFileSync(supportedRequestJSONPath, { encoding: 'utf8' });
    } catch (e) {
        throw new Error(e);
    }

    const supportedRequestData = JSON.parse(supportedRequestJSON);
    const supportedRequestCommands = supportedRequestData.command;
    const supportedRequestScanType = supportedRequestData.scan_type;
    const supportedRequestSchedule = supportedRequestData.schedule;

    if (!nmapJsonData || !nmapJsonData.choosen) {
        throw new Error("Parameters for nmap not provided!");
    }

    //Setup parameters for nmapAPIcall()
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

    //Call API and wait for scan to be over
    nmapAPIcall(scan_type, command, options, schedule, target, target_end)
        .then(scanID => {
            console.log(scanID);
            nmapAPIreport(scanID)
                .then(result => {

                    //Make structured response to save in database
                    let structuredResponse = structureResponse(result);

                    //TODO: save the result to database(need id of the whole "search in database") 
                    saveStructuredResponse(structuredResponse);

                    //TODO: return that the result is saved to database and search for this tool is over
                })
                .catch(error => {
                    // Handle any errors that occur during the process
                    throw new Error(error)
                });
        })
        .catch(error => {
            console.error("Error:", error.message);
        });

}

module.exports = nmap;



