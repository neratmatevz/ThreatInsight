import React, { useState } from 'react';
import ToolPicker from './ToolPicker/ToolPicker';
import SearchForm from './SearchForm/SearchForm';
import { useAuth } from '../../context/AuthContext';

const ScansPage = () => {
    const { user } = useAuth(); // Get the user from the AuthContext
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

    const handleStartScanning = () => {
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

        if (selectedTools.includes("Nmap") && !formData.nmapScanType) {
            alert("Please select an Nmap scan type.");
            return;
        }

        if (showNotes && !formData.notes) {
            alert("Please enter your notes.");
            return;
        }

        const runTemplate = {
            userUID: user?.uid || 'No UID', // Get the UID from the user context
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
    };

    return (
        <div className="scans-page-container">
            <div className="scans-container container-fluid">
                <div className="row flex-grow-1">
                    <div className="col-2">
                        <ToolPicker
                            selectedTools={selectedTools}
                            setSelectedTools={setSelectedTools}
                            onStartScanning={handleStartScanning}
                            setShowNotes={setShowNotes}
                        />
                    </div>
                    <div className="col-10 results-container">
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

export default ScansPage;