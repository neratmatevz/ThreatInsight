const mockScanData = {
    permutatorEmails: [
      "example1@domain.com",
      "example2@domain.com",
    ],
    toolsSearchStatus: {
      permutator: { msg: "Success", success: true },
      ipGeo: { msg: "Success", success: true },
      domainSearch: { msg: "Success", success: true },
      whois: { msg: "Success", success: true },
      tls_dnssec: { msg: "Success", success: true },
      nmap: { msg: "Success", success: true },
      hibp: { msg: "Success", success: true }
    },
    usefulInfoFlags: 5,
    vulnerableInfoFlags: 2,
    emailBreaches: {
      flag: 1,
      emailBreaches: [
        {
          isFabricated: false,
          isMalware: false,
          flag: 1,
          isVerified: true,
          domain: "example.com",
          logoPath: "https://example.com/logo.png",
          name: "Example Breach",
          description: "Example description of the breach.",
          pwnCount: 123456,
          dataClasses: ["Email addresses", "Passwords"],
          breachDate: "2021-01-01",
          email: "example@domain.com"
        }
      ]
    },
    personalData: {
      website: "https://example.com",
      address: { address: "123 Example St", flag: 0 },
      size: { flag: 0, size: "1001-5000" },
      name: "Example University",
      logo: "https://example.com/logo.png",
      description: { flag: 0, description: "Description of the example university." },
      industry: "Education"
    },
    domainData: {
      dnsSec: { dnsSec: true, flag: 1 },
      emails: { emails: [{ email_type: "professional", email: "admin@example.com" }], flag: 1, totalFoundEmails: 1 },
      tlsCertificate: { commonName: "example.com", expiry: { flag: null, expiry: "2025-01-01" } },
      tlsProtocols: {
        tls13: { flag: 0, tls13: true },
        tls12: { flag: null, tls12: true },
        tls11: { flag: null, tls11: false },
        tls10: { flag: null, tls10: false }
      },
      domainCreationDate: "2010-10-20",
      registrar: "Example Registrar",
      domainExpirationDate: { flag: null, domainExpirationDate: "2024-10-20" },
      ipData: {
        cityName: "Example City",
        latitude: 12.3456,
        ip: { flag: 0, ip: "192.168.1.1" },
        isp: { flag: 0, isp: "Example ISP" },
        timeZone: "Example/Timezone",
        countryName: "Example Country",
        userType: "Business",
        autonomousSystemNumber: 12345,
        autonomousSystemOrganization: "Example Org",
        connectionType: "Corporate",
        continentCode: "EX",
        longitude: 65.4321
      },
      domain: "example.com",
      nameServers: { flag: 0, nameServers: ["ns1.example.com", "ns2.example.com"] },
      status: "active"
    },
    hostData: {
      deviceType: { deviceType: "Server", flag: 0 },
      isUp: true,
      osCPE: { flag: null, osCPE: "cpe:/o:example:os:1.0" },
      osDetails: { flag: null, osDetails: "Example OS 1.0" },
      traceroute: { flag: null, traceroute: "traceroute details" },
      ports: { flag: 0, ports: [{ protocol: "tcp", flag: 0, port: 80, service: "http", state: "open", version: "1.0" }] }
    },
    creationDate: "2024-05-27",
    notes: "Example notes",
    name: "Example Scan"
  };
  
  export default mockScanData;
  