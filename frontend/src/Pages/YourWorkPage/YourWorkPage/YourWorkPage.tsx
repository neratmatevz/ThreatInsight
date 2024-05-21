import React from 'react';
import Container from 'react-bootstrap/Container';

import './YourWorkPage.css';
import { useAuth } from '../../../context/AuthContext';
import FrequentScans from '../FrequentScans/FrequentScans';

const YourWorkPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
            <Container className="work-page-container">
                <h2 className="text-left">G'day, {user?.email}</h2>

            </Container>
            <Container>
            <h3 className="text-left">Frequent scans</h3>
            <FrequentScans />
            </Container>
        </>
    );
};

export default YourWorkPage;
