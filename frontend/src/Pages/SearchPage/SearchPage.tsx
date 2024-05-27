import React, { useState, useEffect } from 'react';
import ToolPicker from './ToolPicker/ToolPicker';
import SearchForm from './SearchForm/SearchForm';
import Loader from './Loader/Loader';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../Firebase/firebase'; 
import './SearchPage.css';

const SearchPage = () => {
    const { user } = useAuth(); 
    const [token, setToken] = useState<string | null>(null); 
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        email: '',
        domain: '',
        ip: '',
        nmapScanType: '',
        notes: '',
        title: ''
    });
    const [showNotes, setShowNotes] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    useEffect(() => {
        if (user) {
            auth.currentUser?.getIdToken(true).then((idToken) => {
                setToken(idToken);
            }).catch((error) => {
                console.error('Error getting token:', error);
            });
        }
    }, [user]);

    const handleStartScanning = async () => {
        // Perform validation checks
        if (!formData.title) {
            alert("Please enter a title.");
            return;
        }

        if (selectedTools.includes("HaveIBeenPwned") || selectedTools.includes("E-mail Verifier") || selectedTools.includes("E-mail Permutator")) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(formData.email)) {
                alert("Please enter a valid email address.");
                return;
            }
        }

        if ((selectedTools.includes("WhoIs") || selectedTools.includes("Nmap") || selectedTools.includes("TLS/DNSSec Scan")) && !formData.domain && !formData.ip) {
            alert("Please enter a domain or an IP address.");
            return;
        }

        if (selectedTools.includes("IP Geolocation") && !formData.ip) {
            alert("Please enter an IP address for IP Geolocation.");
            return;
        }

        if (selectedTools.includes("Nmap") && !formData.nmapScanType) {
            alert("Please select an Nmap scan type.");
            return;
        }

        if (showNotes && !formData.notes) {
            alert("Please enter your notes.");
            return;
        }

        if (!token) {
            alert('Token not available');
            return;
        }

        const runTemplate = {
            userUID: user?.uid,
            name: formData.title,
            notes: formData.notes,
            nmap: {
                choosen: selectedTools.includes("Nmap"),
                scan_type: "single",
                command: formData.nmapScanType,
                options: "",
                schedule: "now",
                target: formData.domain || formData.ip,
                target_end: ""
            },
            whois: {
                choosen: selectedTools.includes("WhoIs"),
                ip: formData.ip,
                domain: formData.domain
            },
            hibp: {
                choosen: selectedTools.includes("HaveIBeenPwned"),
                email: formData.email
            },
            ipGeo: {
                choosen: selectedTools.includes("IP Geolocation"),
                ip: formData.ip
            },
            tls_dnssec: {
                choosen: selectedTools.includes("TLS/DNSSec Scan"),
                url: formData.domain
            },
            domainSearch: {
                choosen: selectedTools.includes("Domain Search"),
                company: formData.domain
            },
            permutator: {
                choosen: selectedTools.includes("E-mail Permutator"),
                email: formData.email
            },
        };

        console.log(runTemplate);

        try {
            setIsLoading(true); 
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(runTemplate)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.path) {
                    window.location.href = result.path;
                } else {
                    alert('Path not found in the response.');
                }
            } else {
                console.error('Failed to reach the endpoint. Status:');
                alert('Failed to reach the endpoint. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false); // Hide the loader after the request is complete
        }
    };

    return (
        <div className="scans-page-container">
            {isLoading && <Loader />} {/* Show the loader if isLoading is true */}
            <div className="scans-container container-fluid">
                <div className="row flex-grow-1">
                    <div className="col-lg-2 col-md-12 toolpicker-container">
                        <ToolPicker
                            selectedTools={selectedTools}
                            setSelectedTools={setSelectedTools}
                            onStartScanning={handleStartScanning}
                            setShowNotes={setShowNotes}
                        />
                    </div>
                    <div className="col-lg-10 col-md-12 results-container">
                        <SearchForm
                            selectedTools={selectedTools}
                            setFormData={setFormData}
                            showNotes={showNotes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
