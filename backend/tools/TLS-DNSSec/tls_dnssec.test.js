const tls_dnssec = require('./tls_dnssec');
const structureResponse = require('./tls_dnssecStructureResponse');

describe('tls_dnssec function', () => {

    test('throws an error if parameters for tls_dnssec are not provided', () => {
        expect(() => {
            tls_dnssec(null);
        }).toThrow("Parameters for tls_dnssec not provided!");
    });

    test('throws an error if url parameter is empty', () => {
        expect(() => {
            tls_dnssec({ choosen: true, url: '' });
        }).toThrow("Url cannot be empty!");
    });

    test('structure response for tls_dnssec response', () => {
        const testData = {
            tlsData: {
                timestamp: 1716138751686,
                apiVersion: "1.0.7",
                apiStatus: "success",
                apiCode: 200,
                meta: {
                    url: "k-ajd.eu",
                    test: {
                        id: "dmlv9yt105z63odjt7agt07ogt63vw9k"
                    }
                },
                data: {
                    protocols: {
                        tls10: false,
                        tls11: false,
                        tls12: true,
                        tls13: true
                    },
                    certificate: {
                        commonName: "k-ajd.eu",
                        subjectAltName: "DNS:k-ajd.eu, DNS:www.k-ajd.eu",
                        issuer: {
                            country: "US",
                            organization: "Let's Encrypt",
                            commonName: "R3"
                        },
                        expiry: "Jun 25 10:34:22 2024 GMT"
                    }
                }
            },
            dnssecData: {
                timestamp: 1716138751531,
                apiVersion: "1.0.7",
                apiStatus: "success",
                apiCode: 200,
                meta: {
                    url: "k-ajd.eu",
                    test: {
                        id: "iym8q0y0040uucn1xn6i46n2k7cgp977"
                    }
                },
                data: {
                    isEnabled: false
                }
            }
        }

        const expectedResult = {
            tlsProtocols: { tls10: false, tls11: false, tls12: true, tls13: true },
            tlsCertificate: {
                commonName: 'k-ajd.eu',
                subjectAltName: 'DNS:k-ajd.eu, DNS:www.k-ajd.eu',
                issuer: { country: 'US', organization: "Let's Encrypt", commonName: 'R3' },
                expiry: 'Jun 25 10:34:22 2024 GMT'
            },
            dnsSec: false
        }
        expect(structureResponse(testData)).toEqual(expectedResult);
    });
});