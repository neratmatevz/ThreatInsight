const callChoosenTools = require("./callChoosenTools");
const createSearchInDB = require("./createSearchInDB");
const findChoosenTools = require("./findChoosenTools");
const { getAuth } = require('firebase-admin/auth');
const getIntermediateData = require("./getIntermediateData");
const structureFinalData = require("./structureFinalData");
const saveFinalDataStructure = require("./saveFinalDataStructure");
const checkRequestStructure = require('./checkRequestStructure');

/**
 * Creates a new search instance, processes the choosen tools, and saves the final data structure.
 * 
 * This function performs the following steps:
 * 1. Validates the provided JSON data, ensuring necessary fields are present.
 * 2. Verifies the existence of the user with the given user UID.
 * 3. Creates a new search entry in the database.
 * 4. Identifies the tools chosen for the search from the provided JSON data.
 * 5. Calls the choosen tools to gather data.
 * 6. Fetches intermediate data from the database based on the tools' results.
 * 7. Structures and vulnerability tags the final data.
 * 8. Saves the final data structure to the database.
 * 9. Returns an object containing the path to the new search result.
 * 
 * @param {Object} jsonData - The data required to create and process the search.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the path to the search.
 * @throws {Error} - Throws an error if any step in the process fails.
 */
const createSearch = async (jsonData) => {

    // Check structure of incoming json data
    if(!checkRequestStructure(jsonData)) throw new Error("Request body not structured properly! Scan won't start!")

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
    if (typeof notes !== "string") throw new Error("Can't start search: Notes is not a string!");

    let searchUID;
    try {
        // Create a new search in database and get its id
        searchUID = await createSearchInDB(userUID, name, notes);


        if (!searchUID || typeof searchUID !== "string") throw new Error("Search not created correctly!")

        // Process the json and find choosen tools
        let choosenTools = findChoosenTools(jsonData);

        // Call choosen tool functions
        let toolsResults = await callChoosenTools(choosenTools, userUID, searchUID);

        // Fetch intermediate data from database
        let intermediateData = await getIntermediateData(toolsResults, userUID, searchUID);

        // Structure final data + tag data that can be
        // Calculate vulnerability of target from final data structure
        // Include status of called tools in the final data structure
        let finalStructuredData = await structureFinalData(intermediateData, toolsResults);

        // Save final data
        let pathToSearch = await saveFinalDataStructure(finalStructuredData, userUID, searchUID);

        // Return object with url that has the searches id in it, so the frontend redirects to that site
        return pathToSearch;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = createSearch;