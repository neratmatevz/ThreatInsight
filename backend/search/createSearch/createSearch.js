const callChoosenTools = require("./callChoosenTools");
const createSearchInDB = require("./createSearchInDB");
const findChoosenTools = require("./findChoosenTools");
const { getAuth } = require('firebase-admin/auth');
const getIntermediateData = require("./getIntermediateData");

const createSearch = async (jsonData) => {
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

    let searchUID;
    try {
        // Create a new search in database and get its id
        searchUID = await createSearchInDB(userUID, name, notes);
    } catch (error) {
        throw new Error(error.message);
    }

    if (!searchUID || typeof searchUID !== "string") throw new Error("Search not created correctly!")

    // Process the json and find choosen tools
    let choosenTools = findChoosenTools(jsonData);

    // Call choosen tool functions
    let toolsResults = await callChoosenTools(choosenTools, userUID, searchUID);

    // Fetch intermediate data from database
    let intermediateData = await getIntermediateData(toolsResults, userUID, searchUID);
    return intermediateData;
    // TODO: Structure final data + tag data that can be exploited
    // TODO: Calculate vulnerability of target from final data structure
    // TODO: Save final data
    // TODO: Return object with url that has the searches id in it, so the frontend redirects to that site
}

module.exports = createSearch;