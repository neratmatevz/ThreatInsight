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
        <>
            <Container className="work-page-container">
                <h2 className="text-left">G'day, {user?.email}</h2>

            </Container>
            <Container>
            <h3 className="text-left">Recent scans</h3>
            <FrequentScans />
            <h3 className="text-left">Your statistics</h3>
            <NumberScans />
            <br></br>
            <FrequencyTable />
            </Container>
        </>
    );
};

export default YourWorkPage;
