/**
 * Structures the response from an tls_dnssec scan result,
 * extracting relevant information.
 * 
 * @param {object} result - The tls_dnssec scan result object.
 * @returns {object} - The structured response object.
 */
const structureResponse = (result) => {
    
    const { tlsData, dnssecData } = result;

    if (!tlsData || !dnssecData) {
        throw new Error("Missing TLS or DNSSEC data");
    }

    const structuredResponse = {
        tlsProtocols: {
            tls10: tlsData.data.protocols.tls10,
            tls11: tlsData.data.protocols.tls11,
            tls12: tlsData.data.protocols.tls12,
            tls13: tlsData.data.protocols.tls13
        },
        tlsCertificate: {
            commonName: tlsData.data.certificate.commonName,
            subjectAltName: tlsData.data.certificate.subjectAltName,
            issuer: {
                country: tlsData.data.certificate.issuer.country,
                organization: tlsData.data.certificate.issuer.organization,
                commonName: tlsData.data.certificate.issuer.commonName
            },
            expiry: tlsData.data.certificate.expiry
        },
        dnsSec: dnssecData.data.isEnabled
    };

    return structuredResponse;
};

module.exports = structureResponse;