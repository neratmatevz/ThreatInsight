import React from 'react';
import './ToolPicker.css';

interface ToolPickerProps {
    selectedTools: string[];
    setSelectedTools: React.Dispatch<React.SetStateAction<string[]>>;
}

const ToolPicker: React.FC<ToolPickerProps> = ({ selectedTools, setSelectedTools }) => {

    const handleCheckboxChange = (toolName: string) => {
        setSelectedTools(prevSelectedTools =>
            prevSelectedTools.includes(toolName)
                ? prevSelectedTools.filter(tool => tool !== toolName)
                : [...prevSelectedTools, toolName]
        );
    };

    const tools = ["Nmap", "WhoIs", "HaveIBeenPwned", "IP Geolocation", "TLS/DNSSec Scan", "E-mail Verifier", "E-mail Permutator"];

    return (
        <div className="bg-light col-2 toolpicker-container">
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
                <button className="btn btn-hacker">
                    <i className="fa fa-user-secret" aria-hidden="true"></i> Start Scanning
                </button>
            </div>
        </div>
    );
}

export default ToolPicker;
