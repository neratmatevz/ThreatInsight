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
    { name: "Domain Search", description: "Verify the existence of emails or find emails based on domain or complete address.", icon: "fas fa-envelope-open-text" },
    { name: "E-mail Permutator", description: "Generate possible phishing email accounts based on input guidelines.", icon: "fas fa-user-plus" }
];

const Features: React.FC = () => {
    return (
        <div className="features-section">
            <div className="container mt-5">
                <div className="row justify-content-center align-items-center mb-5">
                    <div className="col-lg-8 purpose-content">
                        <h2>Purpose of Threat Insight</h2>
                        <p>Threat Insight is designed for ethical hackers, penetration testers, and cybersecurity professionals to provide them with a comprehensive suite of tools to enhance their security posture. Our goal is to make cybersecurity tools easily accessible and free to use.</p>
                        <p>Whether you're performing network scans, retrieving domain information, checking data breaches, or verifying email addresses, Threat Insight offers a wide range of functionalities to assist you in your tasks.</p>
                        <p>We aim to help you stay ahead of the threats and ensure the safety and security of your digital assets.</p>
                    </div>
                    <div className="col-lg-4">
                        <img src="/images/security.jpg" alt="Cyber Security" className="img-fluid" />
                    </div>
                </div>
                <div className="features-heading text-center mb-5">
                    <h2>Features</h2>
                    <p>Explore the wide range of tools designed to help you in various aspects of cybersecurity.</p>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-network-wired fa-2x mb-3"></i>
                                <h5 className="card-title">Nmap</h5>
                                <p className="card-text">Network scanning to identify hosts, host statuses, port statuses, operating systems, etc.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-info-circle fa-2x mb-3"></i>
                                <h5 className="card-title">WhoIs</h5>
                                <p className="card-text">Retrieve domain/IP information such as creation date, nameservers, registrar, etc.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-user-secret fa-2x mb-3"></i>
                                <h5 className="card-title">HaveIBeenPwned</h5>
                                <p className="card-text">Check if target's data has been exposed in a data breach.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-map-marked-alt fa-2x mb-3"></i>
                                <h5 className="card-title">IP Geolocation</h5>
                                <p className="card-text">Enter a target IP address to obtain its approximate location.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-lock fa-2x mb-3"></i>
                                <h5 className="card-title">TLS/DNSSec Scan</h5>
                                <p className="card-text">TLS information and DNSSec status.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-envelope-open-text fa-2x mb-3"></i>
                                <h5 className="card-title">Domain Search</h5>
                                <p className="card-text">Verify the existence of emails or find emails based on domain or complete address.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-user-plus fa-2x mb-3"></i>
                                <h5 className="card-title">E-mail Permutator</h5>
                                <p className="card-text">Generate possible phishing email accounts based on input guidelines.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
