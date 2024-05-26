import React from 'react';
import Container from 'react-bootstrap/Container';

import './YourWorkPage.css';
import { useAuth } from '../../../context/AuthContext';
import FrequentScans from '../FrequentScans/FrequentScans';
import FrequencyTable from '../Statistics/FrequencyTable/FrequencyTable';
import NumberScans from '../Statistics/NumberScans/NumberScans';

const YourWorkPage: React.FC = () => {
    const { user } = useAuth();

    return (
       <div className="work-page">
            <Container className="work-page-container">
                <p className="text-left">G'day, {user?.email}</p>

            </Container>
            <Container>
            <p className="text-left">Recent scans</p>
            <FrequentScans />
            <p className="text-left">Your statistic</p>
            <NumberScans />
            <br></br>
            <FrequencyTable />
            </Container>
        </div>
    );
};

export default YourWorkPage;
