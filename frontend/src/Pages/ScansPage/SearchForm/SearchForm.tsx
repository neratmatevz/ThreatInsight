import React from 'react';
import './SearchForm.css';

interface SearchFormProps {
    selectedTools: string[];
}

const SearchForm = ({ selectedTools }: SearchFormProps) => {

    const renderFormFields = () => {
        const commonFields: Set<string> = new Set();
        const fieldComponents: JSX.Element[] = [];

        const getToolsForField = (field: string) => {
            const tools = [];
            if (field === "IP") {
                if (selectedTools.includes("Nmap")) tools.push("Nmap");
                if (selectedTools.includes("WhoIs")) tools.push("WhoIs");
                if (selectedTools.includes("IP Geolocation")) tools.push("IP Geolocation");
            }
            if (field === "Domain") {
                if (selectedTools.includes("Nmap")) tools.push("Nmap");
                if (selectedTools.includes("WhoIs")) tools.push("WhoIs");
                if (selectedTools.includes("TLS/DNSSec Scan")) tools.push("TLS/DNSSec Scan");
            }
            if (field === "Email") {
                if (selectedTools.includes("HaveIBeenPwned")) tools.push("HaveIBeenPwned");
                if (selectedTools.includes("E-mail Verifier")) tools.push("E-mail Verifier");
                if (selectedTools.includes("E-mail Permutator")) tools.push("E-mail Permutator");
            }
            return tools.join(", ");
        };

        if (selectedTools.includes("Nmap") || selectedTools.includes("WhoIs") || selectedTools.includes("IP Geolocation")) {
            commonFields.add("IP");
        }
        if (selectedTools.includes("Nmap") || selectedTools.includes("WhoIs") || selectedTools.includes("TLS/DNSSec Scan")) {
            commonFields.add("Domain");
        }
        if (selectedTools.includes("Nmap")) {
            fieldComponents.push(
                <div key="nmap-type" className="form-group mb-3">
                    <label htmlFor="nmap-type" className="form-label">Nmap Scan Type</label>
                    <select id="nmap-type" className="form-control">
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                        <option value="ping">Ping</option>
                        <option value="port">Port</option>
                        <option value="osinfo">OS Info</option>
                        <option value="osdetect">OS Detect</option>
                    </select>
                </div>
            );
        }
        if (selectedTools.includes("HaveIBeenPwned") || selectedTools.includes("E-mail Verifier") || selectedTools.includes("E-mail Permutator")) {
            commonFields.add("Email");
        }

        commonFields.forEach(field => {
            const label = field.charAt(0).toUpperCase() + field.slice(1);
            const toolsForField = getToolsForField(field);
            fieldComponents.unshift(
                <div key={field} className="form-group mb-4">
                    <label htmlFor={field.toLowerCase()} className="form-label">{label}</label>
                    <input type="text" id={field.toLowerCase()} className="form-control" />
                    {toolsForField && <small className="form-text text-muted">{toolsForField}</small>}
                </div>
            );
        });

        return fieldComponents;
    };

    return (
        <div className="col-10 results-container">
            {renderFormFields()}
        </div>
    );
}

export default SearchForm;
