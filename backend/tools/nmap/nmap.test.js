const nmap = require('./nmap');

describe('nmap function', () => {
    
    test('throws an error if parameters for nmap are not provided', () => {
        expect(() => {
            nmap(null);
        }).toThrow("Parameters for nmap not provided!");
    });

    test('throws an error if scan type is not supported', () => {
        const testData = {
            choosen: true,
            scan_type: "invalid_scan_type",
            command: "normal",
            options: "",
            schedule: "now",
            target: "k-ajd.eu",
            target_end: ""
        };

        expect(() => {
            nmap(testData);
        }).toThrow("Scan type invalid_scan_type is not supported!");
    });

    test('throws an error if command is not supported', () => {
        const testData = {
            choosen: true,
            scan_type: "single",
            command: "invalid_command",
            options: "",
            schedule: "now",
            target: "k-ajd.eu",
            target_end: ""
        };

        expect(() => {
            nmap(testData);
        }).toThrow("Command parameter invalid_command is not supported!");
    });

    test('throws an error if options parameter is not empty', () => {
        const testData = {
            choosen: true,
            scan_type: "single",
            command: "normal",
            options: "some_option",
            schedule: "now",
            target: "k-ajd.eu",
            target_end: ""
        };

        expect(() => {
            nmap(testData);
        }).toThrow("Options parameter is not empty!");
    });

    
});