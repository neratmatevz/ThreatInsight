const checkRequestStructure = require('./checkRequestStructure');
const findChoosenTools = require('./findChoosenTools');

describe('ipGeo function', () => {

    test('Find choosen tools: all false', () => {
        let testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: false,
                scan_type: "single",
                command: "normal",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: false,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: false,
                email: ""
            },
            ipGeo: {
                choosen: false,
                ip: ""
            },
            tls_dnssec: {
                choosen: false,
                url: "um.si"
            },
            domainSearch: {
                choosen: false,
                company: ""
            },
            permutator: {
                choosen: false,
                email: ""
            }
        }

        let expectedResult = {};

        expect(findChoosenTools(testData)).toEqual(expectedResult);
    });

    test('Find choosen tools: one correct', () => {
        let testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: true,
                scan_type: "single",
                command: "normal",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: false,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: false,
                email: ""
            },
            ipGeo: {
                choosen: false,
                ip: ""
            },
            tls_dnssec: {
                choosen: false,
                url: "um.si"
            },
            domainSearch: {
                choosen: false,
                company: ""
            },
            permutator: {
                choosen: false,
                email: ""
            }
        }

        let expectedResult = {
            nmap: {
                choosen: true,
                scan_type: "single",
                command: "normal",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            }
        };

        expect(findChoosenTools(testData)).toEqual(expectedResult);
    });

    test('Find choosen tools: all correct', () => {
        let testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: true,
                scan_type: "single",
                command: "normal",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: true,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: true,
                email: ""
            },
            ipGeo: {
                choosen: true,
                ip: ""
            },
            tls_dnssec: {
                choosen: true,
                url: "um.si"
            },
            domainSearch: {
                choosen: true,
                company: ""
            },
            permutator: {
                choosen: true,
                email: ""
            }
        }

        let expectedResult = {
            nmap: {
                choosen: true,
                scan_type: "single",
                command: "normal",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: true,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: true,
                email: ""
            },
            ipGeo: {
                choosen: true,
                ip: ""
            },
            tls_dnssec: {
                choosen: true,
                url: "um.si"
            },
            domainSearch: {
                choosen: true,
                company: ""
            },
            permutator: {
                choosen: true,
                email: ""
            }
        };

        expect(findChoosenTools(testData)).toEqual(expectedResult);
    });

    test('Check request objects structure: correct structure', () => {

        const testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: false,
                scan_type: "single",
                command: "",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: false,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: false,
                email: ""
            },
            ipGeo: {
                choosen: false,
                ip: ""
            },
            tls_dnssec: {
                choosen: false,
                url: ""
            },
            domainSearch: {
                choosen: false,
                company: ""
            },
            permutator: {
                choosen: false,
                email: ""
            }
        };

        expect(checkRequestStructure(testData)).toBe(true);
    })

    test('Check request objects structure: added key', () => {

        const testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: false,
                scan_type: "single",
                command: "",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: false,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: false,
                email: ""
            },
            ipGeo: {
                choosen: false,
                ip: ""
            },
            tls_dnssec: {
                choosen: false,
                url: ""
            },
            domainSearch: {
                choosen: false,
                company: ""
            },
            permutator: {
                choosen: false,
                email: ""
            },
            addedKey: ""
        };

        expect(checkRequestStructure(testData)).toBe(false);
    })

    test('Check request objects structure: missing outside object key', () => {

        const testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: false,
                scan_type: "single",
                command: "",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: false,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: false,
                email: ""
            },
            ipGeo: {
                choosen: false,
                ip: ""
            },
            tls_dnssec: {
                choosen: false,
                url: ""
            },
            domainSearch: {
                choosen: false,
                company: ""
            },
        };

        expect(checkRequestStructure(testData)).toBe(false);
    })

    test('Check request objects structure: missing inside object key', () => {

        const testData = {
            userUID: "",
            name: "",
            notes: "",
            nmap: {
                choosen: false,
                scan_type: "single",
                command: "",
                options: "",
                schedule: "now",
                target: "",
                target_end: ""
            },
            whois: {
                choosen: false,
                ip: "",
                domain: ""
            },
            hibp: {
                choosen: false,
                email: ""
            },
            ipGeo: {
                choosen: false,
                ip: ""
            },
            tls_dnssec: {
                choosen: false,
                url: ""
            },
            domainSearch: {
                choosen: false,
                company: ""
            },
            permutator: {
                email: ""
            }
        };

        expect(checkRequestStructure(testData)).toBe(false);
    })
});