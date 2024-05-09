import React, { useState } from 'react';
import Header from '../../components/Common/Header/Header';
import ToolPicker from './ToolPicker/ToolPicker';
import Results from './Results/Results';

const ScansPage = () => {
    const [demo, setDemo] = useState<string>("");

    return (
        <>
            <div className="scans-container mt-4">
                <div className="row">
                    <ToolPicker />
                    <Results />
                </div>
            </div>
        </>
    );
}

export default ScansPage;
