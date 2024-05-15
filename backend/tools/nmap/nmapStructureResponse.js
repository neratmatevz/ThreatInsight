/**
 * Structures the response from an Nmap scan result,
 * extracting relevant information.
 * 
 * @param {object} result - The Nmap scan result object.
 * @returns {object} - The structured response object.
 */
const structureResponse = (result) => {

    let scanResult = result.result;
    let scanID = result.scan_id;

    if (result.command === 'fast' || result.command === 'normal' || result.command === 'ping' || result.command === 'port') {

        return (basicCommandStructure(scanResult, scanID));

    }
    else if (result.command === 'osinfo') {

        return (osinfoStructure(scanResult, scanID));

    }
    else if (result.command === 'osdetect') {

        return (osdetectStructure(scanResult, scanID));

    }
};

/**
 * Parses the structure of an Nmap scan result
 * for 'fast', 'normal', 'ping', 'port' commands.
 * 
 * Extracts host information and port details.
 * 
 * @param {string} scanResult - The raw scan result string from Nmap.
 * @param {string} scanID - The ID associated with the scan.
 * @returns {object} An object containing structured information including scan ID, host details, and port information.
 */
const basicCommandStructure = (scanResult, scanID) => {

    // Split the scan result into lines and filter out empty lines
    const lines = scanResult.split('\n').filter(line => line.trim() !== '');

    // Find host information
    const hostInfoLine = lines.find(line => line.includes('Nmap scan report'));
    const hostInfo = hostInfoLine.match(/Nmap scan report for (.*) \((.*)\)/);
    const host = {
        hostname: hostInfo[1],
        ip: hostInfo[2],
        isUp: lines.some(line => line.includes('Host is up'))
    };

    // Find the line containing port information
    const portInfoIndex = lines.findIndex(line => line.startsWith('PORT') && line.includes('STATE') && line.includes('SERVICE'));

    // Extract port information
    const portLines = lines.slice(portInfoIndex + 1, lines.indexOf('Nmap done'));
    const ports = portLines.map(line => {
        const [port, state, service] = line.split(/\s+/);
        return {
            port: parseInt(port.split('/')[0]),
            protocol: port.split('/')[1],
            state,
            service
        };
    }).filter(port => !isNaN(port.port));

    // Return structured response
    return {
        scan_id: scanID,
        host,
        ports
    };
};

/**
 * Parses the structure of an Nmap scan result
 * for 'osinfo' command.
 * 
 * Extracts host information, port details, OS details, device
 * type and traceroute information.
 * 
 * @param {string} scanResult - The raw scan result string from Nmap.
 * @param {string} scanID - The ID associated with the scan.
 * @returns {object} An object containing structured information including scan ID, host details, port information, OS details, device type, and traceroute information.
 */
const osinfoStructure = (scanResult, scanID) => {

    // Split the scan result into lines and filter out empty lines
    const lines = scanResult.split('\n').filter(line => line.trim() !== '');

    // Find host information
    const hostInfoLine = lines.find(line => line.includes('Nmap scan report'));
    const hostInfo = hostInfoLine.match(/Nmap scan report for (.*) \((.*)\)/);
    const host = {
        hostname: hostInfo[1],
        ip: hostInfo[2],
        isUp: lines.some(line => line.includes('Host is up'))
    };

    // Find the line containing port information
    const portInfoIndex = lines.findIndex(line => line.startsWith('PORT') && line.includes('STATE') && line.includes('SERVICE'));

    // Extract port information
    const portLines = lines.slice(portInfoIndex + 1, lines.indexOf('OS details:'));

    const ports = portLines.map(line => {
        const [port, state, service, version] = line.split(/\s+/);
        const portDetails = {
            port: parseInt(port.split('/')[0]),
            protocol: port.split('/')[1],
            state: state, // Correcting state extraction
            service,
            version
        };

        if (portDetails.port === 3306) { // Additional info for port 3306 (MySQL)
            const mysqlInfoLines = lines;
            for (const line of mysqlInfoLines) {
                if (line.startsWith('|   Protocol:')) {
                    const mysqlProtocol = line.match(/Protocol: (.+)/);
                    if (mysqlProtocol) {
                        portDetails.mysql_protocol = mysqlProtocol[1];
                    }
                } else if (line.startsWith('|   Version:')) {
                    const mysqlVersion = line.match(/Version: (.+)/);
                    if (mysqlVersion) {
                        portDetails.mysql_version = mysqlVersion[1];
                    }
                } else if (line.startsWith('|   Thread ID:')) {
                    const mysqlThreadID = line.match(/Thread ID: (.+)/);
                    if (mysqlThreadID) {
                        portDetails.mysql_thread_id = mysqlThreadID[1];
                    }
                } else if (line.startsWith('|   Status:')) {
                    const mysqlStatus = line.match(/Status: (.+)/);
                    if (mysqlStatus) {
                        portDetails.mysql_status = mysqlStatus[1];
                    }
                } else if (line.startsWith('|   Salt:')) {
                    const mysqlSalt = line.match(/Salt: (.+)/);
                    if (mysqlSalt) {
                        portDetails.mysql_salt = mysqlSalt[1];
                    }
                }
            }
        }


        return portDetails;
    }).filter(port => !isNaN(port.port) && port.protocol !== undefined); // Filtering out non-port entries

    // Find OS details
    const osDetailsLine = lines.find(line => line.startsWith('OS details:'));
    const osDetails = osDetailsLine.split(': ')[1].trim();

    // Find device type
    const deviceTypeLine = lines.find(line => line.startsWith('Device type:'));
    const deviceType = deviceTypeLine ? deviceTypeLine.split(': ')[1].trim() : '';

    // Find OS CPE
    const osCPELine = lines.find(line => line.startsWith('OS CPE:'));
    const osCPE = osCPELine ? osCPELine.split(': ')[1].trim() : '';

    // Extract traceroute information
    const tracerouteIndex = lines.findIndex(line => line.startsWith('TRACEROUTE (using port'));
    const tracerouteLines = lines.slice(tracerouteIndex + 1, lines.indexOf('OS and Service detection performed.'));
    const traceroute = tracerouteLines.join('\n'); // Concatenate all traceroute lines into one string

    // Return structured response
    return {
        scan_id: scanID,
        host,
        ports,
        osDetails,
        deviceType,
        osCPE,
        traceroute
    };
}

/**
 * Parses the structure of an Nmap scan result
 * for 'osdetect' command.
 * 
 * Extracts host information, port details, OS details, device type, and OS CPE.
 * 
 * @param {string} scanResult - The raw scan result string from Nmap.
 * @param {string} scanID - The ID associated with the scan.
 * @returns {object} An object containing structured information including scan ID, host details, port information, OS details, device type, and OS CPE.
 */
const osdetectStructure = (scanResult, scanID) => {

    // Split the scan result into lines and filter out empty lines
    const lines = scanResult.split('\n').filter(line => line.trim() !== '');

    // Find host information
    const hostInfoLine = lines.find(line => line.includes('Nmap scan report'));
    const hostInfo = hostInfoLine.match(/Nmap scan report for (.*) \((.*)\)/);
    const host = {
        hostname: hostInfo[1],
        ip: hostInfo[2],
        isUp: lines.some(line => line.includes('Host is up'))
    };

    // Find the line containing port information
    const portInfoIndex = lines.findIndex(line => line.startsWith('PORT') && line.includes('STATE') && line.includes('SERVICE'));

    // Extract port information
    const portLines = lines.slice(portInfoIndex + 1, lines.indexOf('OS details:'));
    const ports = portLines.map(line => {
        const [port, state, service] = line.split(/\s+/);
        return {
            port: parseInt(port.split('/')[0]),
            protocol: port.split('/')[1],
            state,
            service
        };
    }).filter(port => !isNaN(port.port));

    // Find OS details
    const osDetailsLine = lines.find(line => line.startsWith('OS details:'));
    const osDetails = osDetailsLine.split(': ')[1].trim();

    // Find device type
    const deviceTypeLine = lines.find(line => line.startsWith('Device type:'));
    const deviceType = deviceTypeLine ? deviceTypeLine.split(': ')[1].trim() : '';

    // Find OS CPE
    const osCPELine = lines.find(line => line.startsWith('OS CPE:'));
    const osCPE = osCPELine ? osCPELine.split(': ')[1].trim() : '';

    // Return structured response
    return {
        scan_id: scanID,
        host,
        ports,
        osDetails,
        deviceType,
        osCPE
    };
}

module.exports = structureResponse;