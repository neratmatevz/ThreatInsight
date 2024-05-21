const createSearchInDB = require("./createSearchInDB");

const createSearch = async (jsonData) => {

    // Check if parameter exists
    if(!jsonData) throw new Error("Data for search creation not provided!");

    // Check if userUID is provided in request
    const userUID = jsonData.userUID;
    if(!userUID || userUID.trim() === '') throw new Error("Can't start search: User unique ID is not provided!");

    const name = jsonData.name;
    if(!name || name.trim() === '') throw new Error("Can't start search: Search name is not provided!");

    let searchID;
    try{
        // Create a new search in database and get its id
        searchID = await createSearchInDB(userUID, name);
    }catch(error){
        throw new Error(error.message);
    }
    
    console.log(searchID);

    // TODO: Process the json
    // TODO: Call choosen tool functions
    // TODO: Fetch intermediate data from database
    // TODO: Structure final data + tag data that can be exploited
    // TODO: Calculate vulnerability of target from final data structure
    // TODO: Save final data
    // TODO: Return object with url that has the searches id in it, so the frontend redirects to that site
}

module.exports = createSearch;