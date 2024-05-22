const { initializeFirestore } = require("../../firebase");
const callChoosenTools = require("./callChoosenTools");
const createSearchInDB = require("./createSearchInDB");
const findChoosenTools = require("./findChoosenTools");
const { getAuth } = require('firebase-admin/auth');

const createSearch = async (jsonData) => {
    //initializeFirestore()
    // Check if parameter exists
    if (!jsonData) throw new Error("Data for search creation not provided!");

    // Check if userUID is provided in request
    const userUID = jsonData.userUID;
    if (!userUID || userUID.trim() === '') throw new Error("Can't start search: User unique ID is not provided!");

    // Check if userUID corresponds to a user account
    await getAuth()
        .getUser(userUID)
        .then((userRecord) => {
        })
        .catch((error) => {
            throw new Error("Can't start search: User doesn't exist!");
        });

    // Check if name of search is set
    const name = jsonData.name;
    if (!name || name.trim() === '') throw new Error("Can't start search: Search name is not provided!");

    const notes = jsonData.notes;
    if(typeof notes !== "string") throw new Error("Can't start search: Notes is not a string!");

    let searchID;
    try {
        // Create a new search in database and get its id
        searchID = await createSearchInDB(userUID, name, notes);
    } catch (error) {
        throw new Error(error.message);
    }

    // Process the json and find choosen tools
    let choosenTools = findChoosenTools(jsonData);

    console.log(choosenTools)

    // Call choosen tool functions
    let toolsResults = await callChoosenTools(choosenTools);

    console.log(toolsResults);

    // TODO: Fetch intermediate data from database
    // TODO: Structure final data + tag data that can be exploited
    // TODO: Calculate vulnerability of target from final data structure
    // TODO: Save final data
    // TODO: Return object with url that has the searches id in it, so the frontend redirects to that site
}
/*
let test = {
    userUID: "24uSlw5pkIfeNvn6Tp7pMpENGME3",
    name: "Test iz createSearch z pravimi pravimi klici",
    notes: "",
    nmap: {
        choosen: true,
        scan_type: "single",
        command: "fast",
        options: "",
        schedule: "now",
        target: "",
        target_end: ""
    },
    whois: {
        choosen: true,
        ip: "",
        domain: ""
    },
    hibp: {
        choosen: true,
        email: ""
    },
    ipGeo: {
        choosen: true,
        ip: ""
    },
    tls_dnssec: {
        choosen: true,
        url: ""
    },
    domainSearch: {
        choosen: true,
        company: ""
    },
    permutator: {
        choosen: true,
        email: ""
    }
}

createSearch(test)
    .then(result => {
    })
    .catch(err => {
        console.log(err.message)
    });
*/
module.exports = createSearch;