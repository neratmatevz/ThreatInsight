import React, { useState } from 'react';
import './ToolPicker.css';

const ToolPicker: React.FC = () => {
    const [visibleTool, setVisibleTool] = useState<string | null>(null);

    const toggleTool = (toolName: string) => {
        setVisibleTool(visibleTool === toolName ? null : toolName);
    };

    const tools = ["Nmap", "WhoIs", "HaveIBeenPwned", "IP Geolocation", "TLS/DNSSec Scan", "E-mail Verifier", "E-mail Permutator"];

    return (
        <div className="bg-light col-3 toolpicker-container">
            <h2 className="mb-2 fw-normal">ToolPicker</h2>
            <hr></hr>
            {tools.map((tool, index) => (
                <div key={index} className="tool-entry">
                    <div className="tool-item" onClick={() => toggleTool(tool)}>
                        {tool}
                        <span className={`arrow ${visibleTool === tool ? 'up' : 'down'}`}></span>
                    </div>
                    {visibleTool === tool && (
                        <div className="tool-detail">
                            <p>This is a placeholder for {tool} options and settings.</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ToolPicker;
