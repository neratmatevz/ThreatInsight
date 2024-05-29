export interface ScanData {
    creationDate: string;
    notes: string;
    name: string;
    toolsSearchStatus: ToolsSearchStatus;
    usefulInfoFlags: number;
    vulnerableInfoFlags: number;
    personalData: PersonalData;
    emailBreaches: EmailBreaches;
    domainData: DomainData;
    hostData: HostData;
    permutatorEmails: string[];
  }
  
  interface ToolsSearchStatus {
    permutator: ToolStatus;
    ipGeo: ToolStatus;
    domainSearch: ToolStatus;
    whois: ToolStatus;
    tls_dnssec: ToolStatus;
    nmap: ToolStatus;
    hibp: ToolStatus;
  }
  
  interface ToolStatus {
    msg: string;
    success: boolean;
  }
  
  interface PersonalData {
    website: string;
    address: {
      address: string;
      flag: number;
    };
    size: {
      flag: number;
      size: string;
    };
    name: string;
    logo: string;
    description: {
      flag: number;
      description: string;
    };
    industry: string;
  }
  
  interface EmailBreaches {
    flag: number;
    emailBreaches: EmailBreach[];
  }
  
  interface EmailBreach {
    isFabricated: boolean;
    isMalware: boolean;
    flag: number;
    isVerified: boolean;
    domain: string;
    logoPath: string;
    name: string;
    description: string;
    pwnCount: number;
    dataClasses: string[];
    breachDate: string;
    email: string;
  }
  
  interface DomainData {
    dnsSec: {
      dnsSec: boolean;
      flag: number;
    };
    emails: {
      emails: Email[];
      flag: number;
      totalFoundEmails: number;
    };
    tlsCertificate: {
      commonName: string;
      expiry: {
        flag: number | null;
        expiry: string;
      };
    };
    tlsProtocols: {
      tls13: {
        flag: number;
        tls13: boolean;
      };
      tls12: {
        flag: number | null;
        tls12: boolean;
      };
      tls11: {
        flag: number | null;
        tls11: boolean;
      };
      tls10: {
        flag: number | null;
        tls10: boolean;
      };
    };
    domainCreationDate: string;
    registrar: string;
    domainExpirationDate: {
      flag: number | null;
      domainExpirationDate: string;
    };
    ipData: IPData;
    domain: string;
    nameServers: {
      flag: number;
      nameServers: string[];
    };
    status: string;
  }
  
  interface Email {
    email_type: string;
    email: string;
  }
  
  interface IPData {
    cityName: string;
    latitude: number;
    ip: {
      flag: number;
      ip: string;
    };
    isp: {
      flag: number;
      isp: string;
    };
    timeZone: string;
    countryName: string;
    userType: string;
    autonomousSystemNumber: number;
    autonomousSystemOrganization: string;
    connectionType: string;
    continentCode: string;
    longitude: number;
  }
  
  interface HostData {
    deviceType: {
      deviceType: string | null;
      flag: number | null;
    };
    isUp: boolean;
    osCPE: {
      flag: number | null;
      osCPE: string | null;
    };
    osDetails: {
      flag: number | null;
      osDetails: string | null;
    };
    traceroute: {
      flag: number | null;
      traceroute: string | null;
    };
    ports: {
      flag: number;
      ports: Port[];
    };
  }
  
  interface Port {
    protocol: string;
    flag: number;
    port: number;
    service: string;
    state: string;
    version: string | null;
  }
  