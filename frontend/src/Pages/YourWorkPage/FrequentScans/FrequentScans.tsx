import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import './FrequentScans.css';
import { useAuth } from '../../../context/AuthContext';

interface Iskanje {
    id: string;
    ime: string;
}

const FrequentScans: React.FC = () => {
    const { user } = useAuth();
    const [iskanja, setIskanja] = useState<Iskanje[]>([]);

    useEffect(() => {
        const fetchIskanja = async () => {
            if (!user) return;

            try {
                const iskanjaQuerySnapshot = await getDocs(collection(db, 'users', user.uid, 'iskanje'));
                const iskanjaList: Iskanje[] = iskanjaQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ime: doc.data().ime
                }));

                setIskanja(iskanjaList);
            } catch (error) {
                console.error("Error fetching iskanja: ", error);
            }
        };

        fetchIskanja();
    }, [user]);

    return (
        <Container className="frequent-scans-container">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-start">
            {iskanja.map(iskanje => (
                <Col key={iskanje.id}>
                    <Card
                    bg="light"
                        border="secondary"
                        className="mb-4 card-custom"
                        onClick={() => alert(`You clicked on ${iskanje.ime}`)}
                    >
                        <Card.Header>Custom scan</Card.Header>
                        <Card.Body>
                            <Card.Title>{iskanje.ime}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
        </Container>
    );
};

export default FrequentScans;
