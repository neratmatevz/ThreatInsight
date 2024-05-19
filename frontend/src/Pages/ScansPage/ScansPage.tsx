import React, { useState } from 'react';
import Header from '../../components/Common/Header/Header';
import ToolPicker from './ToolPicker/ToolPicker';
import SearchForm from './SearchForm/SearchForm';


const ScansPage = () => {
    const [selectedTools, setSelectedTools] = useState<string[]>([]);

    return (
        <>
            <div className="scans-page-container">
                <div className="scans-container container-fluid mt-4">
                    <div className="row flex-grow-1">
                        <ToolPicker selectedTools={selectedTools} setSelectedTools={setSelectedTools} />
                        <SearchForm selectedTools={selectedTools} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScansPage;
