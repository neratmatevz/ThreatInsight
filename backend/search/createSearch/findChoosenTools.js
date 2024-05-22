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