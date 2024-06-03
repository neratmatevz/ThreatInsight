# ThreatInsight
A web application that offers multiple cybersecurity tools/services in one place for gathering information about a 'target' (Google, UM, target company, etc.), which the user will then save and receive advice about the state of the 'target' or possible vulnerabilities

![Cybersecurity Tools](README_picture.png)

## Tools

The application offers the following tools:

- **nmap**: Scans the network status of the target – hosts, host statuses, port statuses, OS, etc.
- **WhoIs**: Retrieves domain/IP data – creation date, name servers, registrar, etc.
- **HaveIBeenPwned**: Checks if the target's data has been exposed in any breaches and identifies which breaches.
- **IpGeolocation**: Provides an approximate location of the target based on the IP address.
- **TLS/DNSSec scan**: Provides TLS information and DNSSec activation status.
- **E-mail verifier**: Verifies the existence of emails or searches for emails based on a domain or full address.
- **E-mail permutator**: Generates possible phishing email accounts based on given guidelines.

## Built With

This section lists the major frameworks and libraries used to build and bootstrap this project.

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
- ![React Bootstrap](https://img.shields.io/badge/React%20Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## Setup Instructions

### 1. Clone the repo
```
git clone https://github.com/your_username_/ThreatInsight.git
```

For detailed setup instructions, refer to the specific README files for the frontend and backend.

### 2. Backend

For backend setup, including environment variables and API configurations, see the [Backend README](backend/README.md).

### 3. Frontend

For frontend setup, including environment variables and Firebase configuration, see the [Frontend README](frontend/README.md).


