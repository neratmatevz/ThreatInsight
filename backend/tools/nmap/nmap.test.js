const nmap = require('./nmap');
const structureResponse = require('./nmapStructureResponse');

describe('nmap function', () => {
    
    test('throws an error if parameters for nmap are not provided', async () => {
        await expect(nmap(null)).rejects.toThrow("Parameters for nmap not provided!");
    });

    test('throws an error if scan type is not supported', async () => {
        const testData = {
            choosen: true,
            scan_type: "invalid_scan_type",
            command: "normal",
            options: "",
            schedule: "now",
            target: "k-ajd.eu",
            target_end: ""
        };

        await expect(nmap(testData)).rejects.toThrow("Scan type invalid_scan_type is not supported!");
    });

    test('throws an error if command is not supported', async () => {
        const testData = {
            choosen: true,
            scan_type: "single",
            command: "invalid_command",
            options: "",
            schedule: "now",
            target: "k-ajd.eu",
            target_end: ""
        };

        await expect(nmap(testData)).rejects.toThrow("Command parameter invalid_command is not supported!");
    });

    test('throws an error if options parameter is not empty', async () => {
        const testData = {
            choosen: true,
            scan_type: "single",
            command: "normal",
            options: "some_option",
            schedule: "now",
            target: "k-ajd.eu",
            target_end: ""
        };

        await expect(nmap(testData)).rejects.toThrow("Options parameter is not empty!");
    });

    test('structure response for fast, normal, port and ping scan', () => {
        const testData = {
            status_code: 200,
            scan_datetime: '1715609808',
            scan_start_datetime: '1715609811',
            scan_end_datetime: '1715609816',
            scan_id: '70c8f3f646162aea8c6740ef749e5852024d48dc',
            scan_type: 'single',
            target: 'k-ajd.eu',
            command: 'fast',
            nmap_command: 'nmap -F k-ajd.eu',
            result: 'Starting Nmap 7.80 ( https://nmap.org ) at 2024-05-13 10:16 EDT\n' +
              'Nmap scan report for k-ajd.eu (62.72.37.169)\n' +
              'Host is up (0.11s latency).\n' +
              'Other addresses for k-ajd.eu (not scanned): 2a02:4780:27:1147:0:113b:283d:7\n' +
              'Not shown: 95 filtered ports\n' +
              'PORT     STATE  SERVICE\n' +
              '21/tcp   open   ftp\n' +
              '80/tcp   open   http\n' +
              '2121/tcp closed ccproxy-ftp\n' +
              '3306/tcp open   mysql\n' +
              'Nmap done: 1 IP address (1 host up) scanned in 2.89 seconds'
        }

        const expectedResult = {
            scan_id: '70c8f3f646162aea8c6740ef749e5852024d48dc',
            host: { hostname: 'k-ajd.eu', ip: '62.72.37.169', isUp: true },
            ports: [
                { port: 21, protocol: 'tcp', state: 'open', service: 'ftp' },
                { port: 80, protocol: 'tcp', state: 'open', service: 'http' },
                { port: 2121, protocol: 'tcp', state: 'closed', service: 'ccproxy-ftp' },
                { port: 3306, protocol: 'tcp', state: 'open', service: 'mysql' }
            ]
        };
        expect(structureResponse(testData)).toEqual(expectedResult);
    });

    
});