import React from 'react';
import './Features.css';

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
                        <img src="/images/purpose.png" alt="Cyber Security" className="img-fluid1" />
                    </div>
                </div>
                <div className="features-heading mb-5 mt-5">
                    <h2>Features</h2>
                    <p>Explore the wide range of tools designed to help you in various aspects of cybersecurity.</p>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-network-wired fa-2x mb-3"></i>
                                <h5 className="card-title">Nmap</h5>
                                <p className="card-text">
                                    Nmap is a powerful network scanning tool used to identify hosts, port statuses, operating systems, and more within a network. It is essential for network inventory and monitoring service uptime, making it a crucial tool for security professionals.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-info-circle fa-2x mb-3"></i>
                                <h5 className="card-title">WhoIs</h5>
                                <p className="card-text">
                                    WhoIs retrieves information about domain names and IP addresses, including creation dates and registrar details. It's vital for managing internet resources and verifying ownership.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-user-secret fa-2x mb-3"></i>
                                <h5 className="card-title">HaveIBeenPwned</h5>
                                <p className="card-text">
                                    HaveIBeenPwned allows users to check if their personal data has been exposed in a data breach. Enter an email address to discover if it has been compromised and take steps to secure your accounts.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-map-marked-alt fa-2x mb-3"></i>
                                <h5 className="card-title">IP Geolocation</h5>
                                <p className="card-text">
                                    IP Geolocation allows users to enter a target IP address and obtain its approximate location. This is useful for cybersecurity investigations and regional content delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-lock fa-2x mb-3"></i>
                                <h5 className="card-title">TLS/DNSSec Scan</h5>
                                <p className="card-text">
                                    TLS/DNSSec Scan tools provide detailed information about security protocols used to protect data in transit and add a layer of security to the DNS lookup process.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-envelope-open-text fa-2x mb-3"></i>
                                <h5 className="card-title">Domain Search</h5>
                                <p className="card-text">
                                    Domain Search tools allow users to verify the existence of emails or find emails based on a domain or complete address, aiding in reducing spam and phishing attacks.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className="fas fa-user-plus fa-2x mb-3"></i>
                                <h5 className="card-title">E-mail Permutator</h5>
                                <p className="card-text">
                                    The E-mail Permutator generates possible email addresses based on input guidelines, helping in social engineering and penetration testing by simulating phishing attacks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
