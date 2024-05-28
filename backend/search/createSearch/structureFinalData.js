const { domainExpiryFlag, tlsExpiryFlag, emailsFlag, emailBreachesFlag, allPortsFlag, tlsProtocolsFlag, dnssecFlag } = require('./parameterFlags');

/**
 * Structures the final data based on the provided input data.
 * 
 * This function organizes the provided data into a structured format suitable for presentation.
 * It categorizes different types of data, such as personal data, domain data, email breaches,
 * host data, and permutator emails. It also assigns flags to various components based on predefined criteria.
 * 
 * Also calculates how many flags are there in the whole data structure.
 * Adds object of statuses of tools for this search.
 * 
 * Ranked components have another field called "flag" where the vulnerability value is stored:
 *
 * Vulnerability ranking: 
 *   null.........information
 *   0............useful information
 *   1............vulnerable information
 * 
 * @param {Object} data - The input data containing various pieces of information gathered from different tools.
 * @param {Object} toolsSearchStatus - The status of tools called for this search. 
 * @returns {Object} - Returns a structured object containing categorized data with assigned flags.
 */
const structureFinalData = (data, toolsSearchStatus) => {

    // Flag counter for useful info
    let usefulInfoFlags = 0;

    // Flag counter for vulnerable info
    let vulnerableInfoFlags = 0;

    // Flag counter for all ports flag
    let portVulnFlags = 0;
    let portUsefulFlags = 0;

    // Data classes for HIBP that are considered vulnerable information
    const sensitiveDataClasses = [
        "Account balances", "Bank account numbers", "Auth tokens", "Biometric data",
        "Browsing histories", "Cellular network names", "Credit card CVV", "Credit cards",
        "Credit status information", "Device information", "Device serial numbers",
        "Device usage tracking data", "Email addresses", "Email messages", "Encrypted keys",
        "Financial investments", "Financial transactions", "Geographic locations",
        "Government issued IDs", "Health insurance information", "Historical passwords",
        "IP addresses", "MAC addresses", "Passwords", "Physical addresses", "PINs",
        "Partial credit card data", "Passport numbers", "Password hints", "Password strengths"
    ];

    // Function that updates counters of flags
    const updateFlagCounters = (flag) => {
        if (flag === 0) {
            usefulInfoFlags++;
        } else if (flag === 1) {
            vulnerableInfoFlags++;
        }
        return flag;
    };

    // Structuring final data
    let structuredFinalData = {
        personalData: {
            name: data.DOMAINSEARCH?.companyInfo?.name || null,
            address: {
                address: data.DOMAINSEARCH?.companyInfo?.address || null,
                flag: updateFlagCounters(data.DOMAINSEARCH?.companyInfo?.address ? 0 : null)               //FLAG: address found -> 0, address not found -> null
            },
            website: data.DOMAINSEARCH?.companyInfo?.website || null,
            size: {
                size: data.DOMAINSEARCH?.companyInfo?.size || null,
                flag: updateFlagCounters(data.DOMAINSEARCH?.companyInfo?.size ? 0 : null)                  //FLAG: size of company found -> 0, size of company not found -> null
            },
            industry: data.DOMAINSEARCH?.companyInfo?.industry || null,
            description: {
                description: data.DOMAINSEARCH?.companyInfo?.description || null,
                flag: updateFlagCounters(data.DOMAINSEARCH?.companyInfo?.description ? 0 : null)           //FLAG: description found -> 0, description not found -> null
            },
            logo: data.DOMAINSEARCH?.companyInfo?.logo || null
        },
        domainData: {
            domain: data.WHOIS?.address || null,
            registrar: data.WHOIS?.registrar || null,
            nameServers: {
                nameServers: data.WHOIS?.nameServers || [],
                flag: updateFlagCounters(data.WHOIS?.nameServers ? 0 : null)                               //FLAG: nameservers found -> 0, name servers not found -> null
            },
            domainCreationDate: data.WHOIS?.creationDate || null,
            domainExpirationDate: {
                domainExpirationDate: data.WHOIS?.expirationDate || null,
                flag: updateFlagCounters(domainExpiryFlag(data.WHOIS?.expirationDate))                     //FLAG: less than 3 months till expir. -> 1, more than 3 months -> 0, expiration date not found -> null
            },
            status: data.WHOIS?.status || null,
            ipData: {
                ip: {
                    ip: data.NMAP?.host?.ip || null,
                    flag: updateFlagCounters(data.NMAP?.host?.ip ? 0 : null)                               //FLAG: ip found -> 0, ip not found -> null
                },
                isp: {
                    isp: data.IPGEO?.isp || null,
                    flag: updateFlagCounters(data.IPGEO?.isp ? 0 : null)                                   //FLAG: isp found -> 0, isp not found -> null
                },
                latitude: data.IPGEO?.latitude || null,
                longitude: data.IPGEO?.longitude || null,
                cityName: data.IPGEO?.cityName || null,
                countryName: data.IPGEO?.countryName || null,
                userType: data.IPGEO?.userType || null,
                autonomousSystemNumber: data.IPGEO?.autonomousSystemNumber || null,
                autonomousSystemOrganization: data.IPGEO?.autonomousSystemOrganization || null,
                connectionType: data.IPGEO?.connectionType || null,
                continentCode: data.IPGEO?.continentCode || null,
                timeZone: data.IPGEO?.timeZone || null
            },
            emails: {
                totalFoundEmails: data.DOMAINSEARCH?.totalFoundEmails || null,
                emails: data.DOMAINSEARCH?.foundEmails?.map(email => ({
                    email: email.email,
                    email_type: email.email_type
                })) || [],
                flag: updateFlagCounters(emailsFlag(data.DOMAINSEARCH?.foundEmails))                       //FLAG: emails is less than or equal to 5 -> 0, emails more than 5 -> 1, no emails -> null
            },
            dnsSec: {
                dnsSec: data.TLSDNSSEC?.dnsSec != null ? data.TLSDNSSEC.dnsSec : null,
                flag: updateFlagCounters(dnssecFlag(data.TLSDNSSEC?.dnsSec))                                   //FLAG: dnsSec configured -> 0, dnssec not configured -> 1
            },
            tlsProtocols: {
                tls10: {
                    tls10: data.TLSDNSSEC?.tlsProtocols?.hasOwnProperty('tls10') ? data.TLSDNSSEC.tlsProtocols.tls10 : null,
                    flag: updateFlagCounters(data.TLSDNSSEC?.tlsProtocols?.tls10 ? 1 : null)               //FLAG: tls1.0 supported -> 1, tls1.0 not supported -> null
                },
                tls11: {
                    tls11: data.TLSDNSSEC?.tlsProtocols?.hasOwnProperty('tls11') ? data.TLSDNSSEC.tlsProtocols.tls11 : null,
                    flag: updateFlagCounters(data.TLSDNSSEC?.tlsProtocols?.tls11 ? 1 : null)               //FLAG: tls1.1 supported -> 1, tls1.1 not supported -> null
                },
                tls12: {
                    tls12: data.TLSDNSSEC?.tlsProtocols?.hasOwnProperty('tls12') ? data.TLSDNSSEC.tlsProtocols.tls12 : null,
                    flag: updateFlagCounters(tlsProtocolsFlag(data.TLSDNSSEC?.tlsProtocols?.tls12))   //FLAG: tls1.2 supported -> null, tls1.2 not supported -> 0
                },
                tls13: {
                    tls13: data.TLSDNSSEC?.tlsProtocols?.hasOwnProperty('tls13') ? data.TLSDNSSEC.tlsProtocols.tls13 : null,
                    flag: updateFlagCounters(tlsProtocolsFlag(data.TLSDNSSEC?.tlsProtocols?.tls13))   //FLAG: tls1.3 supported -> null, tls1.3 not supported -> 0
                }
            },
            tlsCertificate: { 
                commonName: data.TLSDNSSEC?.tlsCertificate?.commonName || null,
                expiry: {
                    expiry: data.TLSDNSSEC?.tlsCertificate?.expiry || null,
                    flag: updateFlagCounters(tlsExpiryFlag(data.TLSDNSSEC?.tlsCertificate?.expiry))        //FLAG: date expired -> 1, expiry date is within 3 months -> 0, expiry date not provided -> null
                }
            }
        },
        emailBreaches: {
            emailBreaches: data.HIBP?.map(breach => {

                const hasSensitiveData = breach.dataClasses?.some(dataClass => sensitiveDataClasses.includes(dataClass)) || false;

                return ({
                    name: breach.name || null,
                    description: breach.description || null,
                    breachDate: breach.breachDate || null,
                    pwnCount: breach.pwnCount || null,
                    dataClasses: breach.dataClasses || [],
                    domain: breach.domain || null,
                    email: breach.email || null,
                    isFabricated: breach.isFabricated ? true : false,
                    isMalware: breach.isMalware ? true : false,
                    isVerified: breach.isVerified ? true : false,
                    logoPath: breach.logoPath || null,
                    flag: updateFlagCounters(hasSensitiveData ? 1 : 0)                                     //FLAG(single breach): contains sensitive data -> 1, doesnt contain sensitive data -> 0
                })
            }) || [],
            flag: updateFlagCounters(emailBreachesFlag(data.HIBP))                                         //FLAG(all breaches): no breaches -> null, atleast one breach -> 1
        },
        hostData: {
            isUp: data.NMAP?.host?.isUp || null,
            ports: {
                ports: data.NMAP?.ports?.map(port => {
                    let isVulnerable;
                    if (port.state === "open" && port.service === "http" && port.service === "https") {
                        isVulnerable = false;
                        portUsefulFlags += 1;
                    } else if (port.state === "open" && port.service !== "http" && port.service !== "https") {
                        isVulnerable = true;
                        portVulnFlags += 1;
                    } else if (port.state === "filtered") {
                        isVulnerable = false;
                        portUsefulFlags += 1;
                    }

                    return ({
                        protocol: port.protocol || null,
                        port: port.port || null,
                        service: port.service || null,
                        state: port.state || null,
                        version: port.version ?? null,
                        flag: updateFlagCounters(isVulnerable ? 1 : 0)                                     //FLAG(single port): port open(unless its http, https) -> 1, port is filtered -> 0
                    })
                }) || [],
                flag: updateFlagCounters(data.NMAP?.ports ? allPortsFlag(portVulnFlags, portUsefulFlags) : null)   //FLAG(all ports): Returns 1 if atleast one vulnerable. Returns 1 if atleast one useful. Returns null if no ports are provided.
            },
            osDetails: {
                osDetails: data.NMAP?.osDetails || null,
                flag: updateFlagCounters(data.NMAP?.osDetails ? 0 : null)                                  //FLAG: osDetails found -> 0, osDetails not found -> null
            },
            deviceType: {
                deviceType: data.NMAP?.deviceType || null,
                flag: updateFlagCounters(data.NMAP?.deviceType ? 0 : null)                                 //FLAG: deviceType found -> 0, deviceType not found -> null
            },
            osCPE: {
                osCPE: data.NMAP?.osCPE || null,
                flag:updateFlagCounters(data.NMAP?.osCPE ? 0 : null)                                       //FLAG: osCPE found -> 0, osCPE not found -> null
            },
            traceroute: {
                traceroute: data.NMAP?.traceroute || null,
                flag: updateFlagCounters(data.NMAP?.traceroute ? 0 : null)                                 //FLAG: traceroute found -> 0, traceroute not found -> null
            }
        },
        permutatorEmails: data.PERMUTATOR || [],
        vulnerableInfoFlags: vulnerableInfoFlags,
        usefulInfoFlags: usefulInfoFlags,
        toolsSearchStatus: toolsSearchStatus
    };

    return structuredFinalData;
}

module.exports = structureFinalData;