const { getFirestoreInstance, initializeFirestore } = require("../../firebase");

const getIntermediateData = async (toolsResultsStatus, userUID, searchUID) => {
    initializeFirestore();
    const db = getFirestoreInstance();

    const dbToolNames = {
        nmap: "NMAP",
        whois: "WHOIS",
        hibp: "HIBP",
        ipGeo: "IPGEO",
        tls_dnssec: "TLSDNSSEC",
        domainSearch: "DOMAINSEARCH",
        permutator: "PERMUTATOR"
    }

    try {
        const dbIntermediateResultRef = db.collection('users').doc(userUID).collection('iskanje').doc(searchUID);
        const dbIntermediateResult = await dbIntermediateResultRef.get();
        let searchIntermediateData;

        if (dbIntermediateResult.exists) {
            searchIntermediateData = dbIntermediateResult.data();
        }

        const successfulToolKeys = Object.keys(toolsResultsStatus).filter(tool => toolsResultsStatus[tool].success);

        // Create an object with only the successful tools data
        const successfulToolsData = successfulToolKeys.reduce((acc, tool) => {
            const toolKey = dbToolNames[tool];
            if (toolKey && searchIntermediateData[toolKey]) {
                acc[toolKey] = searchIntermediateData[toolKey];
            }
            return acc;
        }, {});

        return successfulToolsData;

    } catch (error) {
        throw new Error("Failed fetching search intermediate results");
    }
}

module.exports = getIntermediateData;