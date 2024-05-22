import React, { useState } from 'react';
import './ToolPicker.css';

interface ToolPickerProps {
    selectedTools: string[];
    setSelectedTools: React.Dispatch<React.SetStateAction<string[]>>;
    onStartScanning: () => void; // Add this prop
    setShowNotes: React.Dispatch<React.SetStateAction<boolean>>; // Add this prop
}

const ToolPicker: React.FC<ToolPickerProps> = ({ selectedTools, setSelectedTools, onStartScanning, setShowNotes }) => {
    const [notesSelected, setNotesSelected] = useState<boolean>(false);

    const handleCheckboxChange = (toolName: string) => {
        setSelectedTools(prevSelectedTools =>
            prevSelectedTools.includes(toolName)
                ? prevSelectedTools.filter(tool => tool !== toolName)
                : [...prevSelectedTools, toolName]
        );
    };

    const handleNotesClick = () => {
        setNotesSelected(prev => !prev);
        setShowNotes(prev => !prev);
    };

    const tools = ["Nmap", "WhoIs", "HaveIBeenPwned", "IP Geolocation", "TLS/DNSSec Scan", "Domain Search", "E-mail Permutator"];

    return (
        <div className="toolpicker-container">
            <h3 className="toolpicker-header"><i className="fa fa-wrench tool-icon" aria-hidden="true"></i> Available tools:</h3>
            {tools.map((tool, index) => (
                <div
                    key={index}
                    className={`tool-entry mb-3 p-2 border rounded ${selectedTools.includes(tool) ? 'selected' : ''}`}
                    onClick={() => handleCheckboxChange(tool)}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="form-check-label mb-0" htmlFor={`checkbox-${tool}`}>
                            {tool}
                        </label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={tool}
                            id={`checkbox-${tool}`}
                            checked={selectedTools.includes(tool)}
                            onChange={() => handleCheckboxChange(tool)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            ))}
            <div className="button-container">
                <button className={`btn-notes ${notesSelected ? 'selected' : ''}`} onClick={handleNotesClick}>
                    <i className="fa fa-pencil-alt" aria-hidden="true"></i> Add Notes
                </button>
            </div>
            <div className="button-container">
                <button className="btn btn-hacker" onClick={onStartScanning}>
                    <i className="fa fa-user-secret" aria-hidden="true"></i> Start Scanning
                </button>
            </div>

        </div>
    );
}

export default ToolPicker;
