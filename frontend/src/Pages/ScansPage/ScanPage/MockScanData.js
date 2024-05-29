const mockScanData = {
  permutatorEmails: [
    "marjan.hericko@um.si",
    "marjanhericko@um.si",
    "marjan-hericko@um.si",
    "marjan_hericko@um.si",
    "herickomarjan@um.si",
    "hericko.marjan@um.si",
    "hericko-marjan@um.si",
    "hericko_marjan@um.si",
    "mhericko@um.si",
    "m.hericko@um.si",
    "m-hericko@um.si",
    "m_hericko@um.si",
    "marjanh@um.si",
    "marjan.h@um.si",
    "marjan-h@um.si",
    "marjan_h@um.si",
    "mh@um.si",
    "m.h@um.si",
    "m-h@um.si",
    "m_h@um.si",
    "herickom@um.si",
    "hericko.m@um.si",
    "hericko-m@um.si",
    "hericko_m@um.si"
  ],

  toolsSearchStatus: {
    permutator: {
      msg: "Permutations saved successfully",
      success: true
    },
    ipGeo: {
      msg: "Result saved successfully",
      success: true
    },
    domainSearch: {
      msg: "Result saved succesfully",
      success: true
    },
    whois: {
      msg: "Result saved successfully",
      success: true
    },
    tls_dnssec: {
      msg: "Result saved succesfully",
      success: true
    },
    nmap: {
      msg: "Result saved succesfully",
      success: true
    },
    hibp: {
      msg: "Result saved successfully",
      success: true
    }
  },
    usefulInfoFlags: 32,
    vulnerableInfoFlags: 6,
    emailBreaches: {
      flag: 1,
      emailBreaches: [
        {
          isFabricated: false,
          isMalware: false,
          flag: 1,
          isVerified: true,
          domain: "apollo.io",
          logoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/Apollo.png",
          name: "Apollo",
          description: "In July 2018, the sales engagement startup <a href=\"https://www.wired.com/story/apollo-breach-linkedin-salesforce-data/\" target=\"_blank\" rel=\"noopener\">Apollo left a database containing billions of data points publicly exposed without a password</a>. The data was discovered by security researcher <a href=\"http://www.vinnytroia.com/\" target=\"_blank\" rel=\"noopener\">Vinny Troia</a> who subsequently sent a subset of the data containing 126 million unique email addresses to Have I Been Pwned. The data left exposed by Apollo was used in their &quot;revenue acceleration platform&quot; and included personal information such as names and email addresses as well as professional information including places of employment, the roles people hold and where they're located. Apollo stressed that the exposed data did not include sensitive information such as passwords, social security numbers or financial data. <a href=\"https://www.apollo.io/contact\" target=\"_blank\" rel=\"noopener\">The Apollo website has a contact form</a> for those looking to get in touch with the organisation.",
          pwnCount: 125929660,
          dataClasses: [
            "Email addresses",
            "Employers",
            "Geographic locations",
            "Job titles",
            "Names",
            "Phone numbers",
            "Salutations",
            "Social media profiles"
          ],
          breachDate: "2018-07-23",
          email: "marjan.hericko@um.si"
        },
        {
          isFabricated: false,
          isMalware: false,
          flag: 1,
          isVerified: true,
          domain: null,
          logoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/List.png",
          name: "PDL",
          description: "In October 2019, <a href=\"https://www.troyhunt.com/data-enrichment-people-data-labs-and-another-622m-email-addresses\" target=\"_blank\" rel=\"noopener\">security researchers Vinny Troia and Bob Diachenko identified an unprotected Elasticsearch server holding 1.2 billion records of personal data</a>. The exposed data included an index indicating it was sourced from data enrichment company People Data Labs (PDL) and contained 622 million unique email addresses. The server was not owned by PDL and it's believed a customer failed to properly secure the database. Exposed information included email addresses, phone numbers, social media profiles and job history data.",
          pwnCount: 622161052,
          dataClasses: [
            "Email addresses",
            "Employers",
            "Geographic locations",
            "Job titles",
            "Names",
            "Phone numbers",
            "Social media profiles"
          ],
          breachDate: "2019-10-16",
          email: "marjan.hericko@um.si"
        },
        {
          isFabricated: false,
          isMalware: false,
          flag: 1,
          isVerified: true,
          domain: "linkedin.com",
          logoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/LinkedIn.png",
          name: "LinkedInScrape",
          description: "During the first half of 2021, <a href=\"https://www.businessinsider.com.au/linkedin-data-scraped-500-million-users-for-sale-online-2021-4\" target=\"_blank\" rel=\"noopener\">LinkedIn was targeted by attackers who scraped data from hundreds of millions of public profiles and later sold them online</a>. Whilst the scraping did not constitute a data breach nor did it access any personal data not intended to be publicly accessible, the data was still monetised and later broadly circulated in hacking circles. The scraped data contains approximately 400M records with 125M unique email addresses, as well as names, geographic locations, genders and job titles. LinkedIn specifically addresses the incident in their post on <a href=\"https://news.linkedin.com/2021/june/an-update-from-linkedin\" target=\"_blank\" rel=\"noopener\">An update on report of scraped data</a>.",
          pwnCount: 125698496,
          dataClasses: [
            "Education levels",
            "Email addresses",
            "Genders",
            "Geographic locations",
            "Job titles",
            "Names",
            "Social media profiles"
          ],
          breachDate: "2021-04-08",
          email: "marjan.hericko@um.si"
        }
      ]
    },
    personalData: {
      website: "https://www.um.si/",
      address: {
        address: "Slomškov trg 15, Maribor",
        flag: 0
      },
      size: {
        flag: 0,
        size: "1001-5000"
      },
      name: "Univerza v Mariboru",
      logo: "https://assets-prospeo.s3.us-east-2.amazonaws.com/company_GUEAYHKKAYJYKSS7JIUB.jpg",
      description: {
        flag: 0,
        description: "The University of Maribor was established in 1975. With its 17 Faculties, the University Library Maribor and the Student Dormitories, it is the second largest and second oldest university in Slovenia with a long tradition. During these years, it became a successful scientific institution, the primary mission and guiding principle of which is the dissemination and enrichment of knowledge. It is rapidly developing new areas of activity, testing new study methods, and seeking new ways of integrating with its environment."
      },
      industry: "Higher Education"
    },
  
    domainData: {
      dnsSec: {
        dnsSec: false,
        flag: 1
      },
      emails: {
        emails: [
          {
            email_type: "professional",
            email: "matej.crepinsek@um.si"
          },
          {
            email_type: "professional",
            email: "outgoing.erasmus@um.si"
          },
          {
            email_type: "professional",
            email: "sonja.sostar@um.si"
          },
          {
            email_type: "professional",
            email: "karin.stana@um.si"
          },
          {
            email_type: "professional",
            email: "gasper.sedej@um.si"
          },
          {
            email_type: "professional",
            email: "anze.mihelic@um.si"
          },
          {
            email_type: "generic",
            email: "studentski.svet@um.si"
          },
          {
            email_type: "generic",
            email: "international.fkbv@um.si"
          },
          {
            email_type: "professional",
            email: "ignacijo.bilus@um.si"
          },
          {
            email_type: "professional",
            email: "stane.bozicnik@um.si"
          },
          {
            email_type: "professional",
            email: "dekanat.pef@um.si"
          },
          {
            email_type: "professional",
            email: "ern@um.si"
          },
          {
            email_type: "professional",
            email: "drago.bokal@um.si"
          },
          {
            email_type: "professional",
            email: "peter.planinsic@um.si"
          },
          {
            email_type: "professional",
            email: "robert.repnik@um.si"
          },
          {
            email_type: "professional",
            email: "stojan.puhalj@um.si"
          },
          {
            email_type: "professional",
            email: "borut.zalik@um.si"
          },
          {
            email_type: "professional",
            email: "our.economy@um.si"
          },
          {
            email_type: "professional",
            email: "maja.pusnik@um.si"
          },
          {
            email_type: "professional",
            email: "iztok.slatinek@um.si"
          },
          {
            email_type: "professional",
            email: "silvo.dajcman@um.si"
          },
          {
            email_type: "professional",
            email: "beno.msarec@um.si"
          },
          {
            email_type: "professional",
            email: "info.pf@um.si"
          },
          {
            email_type: "professional",
            email: "mobilnost.zaposlenih@um.si"
          },
          {
            email_type: "professional",
            email: "ales.zamuda@um.si"
          },
          {
            email_type: "professional",
            email: "tekmovanja.pf@um.si"
          },
          {
            email_type: "professional",
            email: "kepoi.fs@um.si"
          },
          {
            email_type: "professional",
            email: "timi.gomboc@um.si"
          },
          {
            email_type: "professional",
            email: "rektorat@um.si"
          },
          {
            email_type: "professional",
            email: "borut.jereb@um.si"
          },
          {
            email_type: "professional",
            email: "mateja.kuntaric@um.si"
          },
          {
            email_type: "professional",
            email: "suzana.kraljic@um.si"
          },
          {
            email_type: "professional",
            email: "silvester.liposek@um.si"
          },
          {
            email_type: "professional",
            email: "zoran.ren@um.si"
          },
          {
            email_type: "professional",
            email: "mbarbara.donik@um.si"
          },
          {
            email_type: "professional",
            email: "sabina.mulej@um.si"
          },
          {
            email_type: "professional",
            email: "andreja.trdina@um.si"
          },
          {
            email_type: "professional",
            email: "ales.holobar@um.si"
          },
          {
            email_type: "professional",
            email: "viola.hobiger@um.si"
          },
          {
            email_type: "professional",
            email: "marko.jakovac@um.si"
          },
          {
            email_type: "professional",
            email: "polona.tominc@um.si"
          },
          {
            email_type: "professional",
            email: "maja.hmelak@um.si"
          },
          {
            email_type: "professional",
            email: "zoran.stjepanovic@um.si"
          },
          {
            email_type: "professional",
            email: "vito.bobek@um.si"
          },
          {
            email_type: "professional",
            email: "usc@um.si"
          },
          {
            email_type: "professional",
            email: "aleksandra.lovrencic@um.si"
          },
          {
            email_type: "professional",
            email: "zdenko.dezelak@um.si"
          },
          {
            email_type: "professional",
            email: "erasmus@um.si"
          },
          {
            email_type: "professional",
            email: "jasmina.znidarsic@um.si"
          },
          {
            email_type: "professional",
            email: "romana.korez@um.si"
          }
        ],
        flag: 1,
        totalFoundEmails: 921
      },
      tlsCertificate: {
        commonName: "um.si",
        expiry: {
          flag: null,
          expiry: "Jan  2 23:59:59 2025 GMT"
        }
      },
      tlsProtocols: {
        tls13: {
          flag: 0,
          tls13: false
        },
        tls12: {
          flag: null,
          tls12: true
        },
        tls11: {
          flag: null,
          tls11: false
        },
        tls10: {
          flag: null,
          tls10: false
        }
      },
      domainCreationDate: "Wed, 20 Oct 2010 00:00:00 GMT",
      registrar: "Arnes",
      domainExpirationDate: {
        flag: null,
        domainExpirationDate: "Sun, 20 Oct 2024 00:00:00 GMT"
      },
      ipData: {
        cityName: "Maribor (Center)",
        latitude: 46.5592,
        ip: {
          flag: 0,
          ip: "164.8.42.101"
        },
        isp: {
          flag: 0,
          isp: "UNI-MB"
        },
        timeZone: "Europe/Ljubljana",
        countryName: "Slovenia",
        userType: "business",
        autonomousSystemNumber: 50195,
        autonomousSystemOrganization: "Univerza v Mariboru",
        connectionType: "Corporate",
        continentCode: "EU",
        longitude: 15.6433
      },
      domain: "um.si",
      nameServers: {
        flag: 0,
        nameServers: [
          "kanin.arnes.si",
          "dorf21.uni-mb.si",
          "niobe.ijs.si",
          "livka.uni-mb.si",
          "clitocybe.um.si"
        ]
      },
      status: "ok"
    },
  
    hostData: {
      deviceType: {
        deviceType: null,
        flag: null
      },
      isUp: true,
      osCPE: {
        flag: null,
        osCPE: null
      },
      osDetails: {
        flag: null,
        osDetails: null
      },
      traceroute: {
        flag: null,
        traceroute: null
      },
      ports: {
        flag: 0,
        ports: [
          {
            protocol: "tcp",
            flag: 0,
            port: 19,
            service: "chargen",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 23,
            service: "telnet",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 25,
            service: "smtp",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 53,
            service: "domain",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 80,
            service: "http",
            state: "open",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 88,
            service: "kerberos-sec",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 135,
            service: "msrpc",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 139,
            service: "netbios-ssn",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 161,
            service: "snmp",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 211,
            service: "914c-g",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 389,
            service: "ldap",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 443,
            service: "https",
            state: "open",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 445,
            service: "microsoft-ds",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 500,
            service: "isakmp",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 636,
            service: "ldapssl",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 993,
            service: "imaps",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 1433,
            service: "ms-sql-s",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 1434,
            service: "ms-sql-m",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 1900,
            service: "upnp",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 3128,
            service: "squid-http",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 3268,
            service: "globalcatLDAP",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 3269,
            service: "globalcatLDAPssl",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 3389,
            service: "ms-wbt-server",
            state: "filtered",
            version: null
          },
          {
            protocol: "tcp",
            flag: 0,
            port: 9100,
            service: "jetdirect",
            state: "filtered",
            version: null
          }
        ]
      }
    },
  
    creationDate: "2024-05-27",
    notes: "Lorem ipsum dolor sit.",
    name: "Example Scan"
  };
  
  export default mockScanData;
  