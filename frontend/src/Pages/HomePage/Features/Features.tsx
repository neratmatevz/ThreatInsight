import React from 'react';
import './Features.css';

interface Feature {
    name: string;
    description: string;
    icon: string;
}

const featuresData: Feature[] = [
    { name: "Nmap", description: "Network scanning to identify hosts, host statuses, port statuses, operating systems, etc.", icon: "fas fa-network-wired" },
    { name: "WhoIs", description: "Retrieve domain/IP information such as creation date, nameservers, registrar, etc.", icon: "fas fa-info-circle" },
    { name: "HaveIBeenPwned", description: "Check if target's data has been exposed in a data breach.", icon: "fas fa-user-secret" },
    { name: "IP Geolocation", description: "Enter a target IP address to obtain its approximate location.", icon: "fas fa-map-marked-alt" },
    { name: "TLS/DNSSec Scan", description: "TLS information and DNSSec status.", icon: "fas fa-lock" },
    { name: "E-mail Verifier", description: "Verify the existence of emails or find emails based on domain or complete address.", icon: "fas fa-envelope-open-text" },
    { name: "E-mail Permutator", description: "Generate possible phishing email accounts based on input guidelines.", icon: "fas fa-user-plus" }
];

const Features: React.FC = () => {
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="row">
                {featuresData.map((feature, index) => (
                    <div className="col-md-6 col-lg-3 mb-4" key={index}>
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <i className={`${feature.icon} fa fa-2x mb-3`}></i>
                                <h5 className="card-title">{feature.name}</h5>
                                <p className="card-text">{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Features;
