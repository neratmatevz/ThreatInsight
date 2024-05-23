/**
 * Extracts and returns the tools marked as chossen from the provided JSON data.
 * 
 * This function iterates over the provided JSON data, identifying and collecting tools
 * that are marked as chossen (excluding the 'userUID', 'name', and 'notes' fields). It
 * returns an object containing only the choosen tools.
 * 
 * @param {Object} jsonData - The JSON data containing tool information.
 * @returns {Object} - An object containing the tools with their data that are marked as choosen.
 * @throws {Error} - Throws an error if the JSON data is not provided or is invalid.
 */
const findChoosenTools = (jsonData) => {

    const choosenTools = {};

    for (const toolName in jsonData) {

        if (toolName !== "userUID" && toolName !== "name" && toolName !== "notes") {

            if (jsonData[toolName].choosen) {

                choosenTools[toolName] = jsonData[toolName];

            }

        }

    }

    return choosenTools;

}


module.exports = findChoosenTools;