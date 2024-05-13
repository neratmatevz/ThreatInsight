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

        // Extract port information
        const portLines = lines.slice(lines.indexOf('PORT     STATE  SERVICE') + 1, lines.indexOf('Nmap done'));
        const ports = portLines.map(line => {
            const [port, state, service] = line.split(/\s+/);
            return {
                port: parseInt(port.split('/')[0]),
                protocol: port.split('/')[1],
                state,
                service
            };
        });

        // Return structured response
        return {
            scan_id : scanID,
            host,
            ports
        };

    }
    else if(result.command === 'osinfo'){
        //TODO: function that structures response from 'osinfo' scan
    }
    else if(result.command === 'osdetect'){
        //TODO: function that structures response from 'osdetect' scan

    }
};

module.exports = structureResponse;