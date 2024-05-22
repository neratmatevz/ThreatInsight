import React, { useState, useEffect } from 'react';
import './SearchForm.css';

interface SearchFormProps {
    selectedTools: string[];
    setFormData: React.Dispatch<React.SetStateAction<{
        email: string;
        domain: string;
        ip: string;
        nmapScanType: string;
        notes: string;
        title: string;
    }>>;
    showNotes: boolean;
}

const SearchForm = ({ selectedTools, setFormData, showNotes }: SearchFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [domain, setDomain] = useState<string>('');
    const [ip, setIP] = useState<string>('');
    const [nmapScanType, setNmapScanType] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        setFormData({ email, domain, ip, nmapScanType, notes, title });
    }, [email, domain, ip, nmapScanType, notes, title, setFormData]);

    const handleScanTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNmapScanType(event.target.value);
    };

    const showEmailInput = selectedTools.includes("HaveIBeenPwned") || selectedTools.includes("E-mail Permutator");
    const showDomainInput = selectedTools.includes("WhoIs") || selectedTools.includes("Nmap") || selectedTools.includes("TLS/DNSSec Scan") || selectedTools.includes("Domain Search");
    const showIPInput = selectedTools.includes("IP Geolocation") || selectedTools.includes("Nmap") || selectedTools.includes("TLS/DNSSec Scan") ;

    return (
        <div className="search-form-container">
            <div className="custom-title-input-container">
                <input 
                    type="text" 
                    placeholder="Enter title here..." 
                    className="custom-title-input" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
            </div>
            {showEmailInput && (
                <div className="custom-form-group">
                    <label htmlFor="email" className="custom-form-label">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="custom-form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <small className="custom-form-text">
                        {selectedTools.filter(tool => ["HaveIBeenPwned", "E-mail Permutator"].includes(tool)).join(', ')}
                    </small>
                </div>
            )}
            {showDomainInput && (
                <div className="custom-form-group">
                    <label htmlFor="domain" className="custom-form-label">Domain</label>
                    <input 
                        type="text" 
                        id="domain" 
                        className="custom-form-control" 
                        value={domain} 
                        onChange={(e) => setDomain(e.target.value)} 
                        required 
                    />
                    <small className="custom-form-text">
                        {selectedTools.filter(tool => ["Domain Search", "WhoIs", "Nmap", "TLS/DNSSec Scan"].includes(tool)).join(', ')}
                    </small>
                </div>
            )}
            {showIPInput && (
                <div className="custom-form-group">
                    <label htmlFor="ip" className="custom-form-label">IP</label>
                    <input 
                        type="text" 
                        id="ip" 
                        className="custom-form-control" 
                        value={ip} 
                        onChange={(e) => setIP(e.target.value)} 
                        required 
                    />
                    <small className="custom-form-text">
                        {selectedTools.filter(tool => ["IP Geolocation", "WhoIs", "Nmap", "TLS/DNSSec Scan"].includes(tool)).join(', ')}
                    </small>
                </div>
            )}
            {selectedTools.includes("Nmap") && (
                <div className="custom-form-group">
                    <label className="custom-form-label">Nmap Scan Type</label>
                    <div className="custom-radio-group">
                        <div className="custom-radio">
                            <input
                                type="radio"
                                name="nmap-type"
                                id="normal"
                                value="normal"
                                checked={nmapScanType === 'normal'}
                                onChange={handleScanTypeChange}
                                required
                            />
                            <label htmlFor="normal">Normal</label>
                            <i className="fa fa-info-circle info-icon" data-tooltip="Default scan type."></i>
                        </div>
                        <div className="custom-radio">
                            <input
                                type="radio"
                                name="nmap-type"
                                id="fast"
                                value="fast"
                                checked={nmapScanType === 'fast'}
                                onChange={handleScanTypeChange}
                                required
                            />
                            <label htmlFor="fast">Fast</label>
                            <i className="fa fa-info-circle info-icon" data-tooltip="Fast scan, fewer ports."></i>
                        </div>
                        <div className="custom-radio">
                            <input
                                type="radio"
                                name="nmap-type"
                                id="ping"
                                value="ping"
                                checked={nmapScanType === 'ping'}
                                onChange={handleScanTypeChange}
                                required
                            />
                            <label htmlFor="ping">Ping</label>
                            <i className="fa fa-info-circle info-icon" data-tooltip="Ping scan to check hosts."></i>
                        </div>
                        <div className="custom-radio">
                            <input
                                type="radio"
                                name="nmap-type"
                                id="port"
                                value="port"
                                checked={nmapScanType === 'port'}
                                onChange={handleScanTypeChange}
                                required
                            />
                            <label htmlFor="port">Port</label>
                            <i className="fa fa-info-circle info-icon" data-tooltip="Scans specific ports."></i>
                        </div>
                        <div className="custom-radio">
                            <input
                                type="radio"
                                name="nmap-type"
                                id="osinfo"
                                value="osinfo"
                                checked={nmapScanType === 'osinfo'}
                                onChange={handleScanTypeChange}
                                required
                            />
                            <label htmlFor="osinfo">OS Info</label>
                            <i className="fa fa-info-circle info-icon" data-tooltip="Gets OS info."></i>
                        </div>
                        <div className="custom-radio">
                            <input
                                type="radio"
                                name="nmap-type"
                                id="osdetect"
                                value="osdetect"
                                checked={nmapScanType === 'osdetect'}
                                onChange={handleScanTypeChange}
                                required
                            />
                            <label htmlFor="osdetect">OS Detect</label>
                            <i className="fa fa-info-circle info-icon" data-tooltip="Detects OS with probes."></i>
                        </div>
                    </div>
                </div>
            )}
            {showNotes && (
                <div className="custom-form-group">
                    <label htmlFor="notes" className="custom-form-label">My Notes</label>
                    <textarea 
                        id="notes" 
                        className="custom-form-control" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        maxLength={200} 
                        rows={4}
                        required
                    />
                    <small className="custom-form-text">{notes.length}/200</small>
                </div>
            )}
        </div>
    );
}

export default SearchForm;
