import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import './RecentScans.css';
import { useAuth } from '../../../context/AuthContext';
import Badge from 'react-bootstrap/Badge';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export interface Iskanje {
    id: string;
    name: string;
    creationDate: string;
}

const RecentScans: React.FC = () => {
    const { user } = useAuth();
    const [iskanja, setIskanja] = useState<Iskanje[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchIskanja = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
    
            try {
                const currentTimestamp = getCurrentTimestampInSeconds();
                const iskanjaQuery = query(
                    collection(db, 'users', user.uid, 'iskanje'),
                    orderBy('creationDate', 'desc'),
                    limit(4)
                );
                const iskanjaQuerySnapshot = await getDocs(iskanjaQuery);
                const iskanjaList: Iskanje[] = iskanjaQuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    creationDate: getDuration(currentTimestamp, doc.data().creationDate.seconds)
                }));
    
                setIskanja(iskanjaList);
            } catch (error) {
                console.error("Error fetching iskanja: ", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchIskanja();
    }, [user]);

    function getCurrentTimestampInSeconds(): number {
        return Math.floor(Date.now() / 1000); 
    }

    function getDuration(timestamp1: number, timestamp2: number): string {
        const difference = Math.abs(timestamp1 - timestamp2); 
    
        const days = Math.floor(difference / (60 * 60 * 24));
        const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((difference % (60 * 60)) / 60);
        const seconds = difference % 60;
    
        if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    }

    const handleCardClick = (id: string) => {
        navigate(`/scans/${id}`)
    }
    

    return (
        <Container className="frequent-scans-container">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : iskanja.length === 0 ? (
                <Card className="mb-4 card-custom">
                    <Card.Body>
                        <Card.Title>You don't have any scans yet.</Card.Title>
                    </Card.Body>
                </Card>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-start">
                    {iskanja.map(iskanje => (
                        <Col key={iskanje.id}>
                              <Card className="mb-4 card-custom" onClick={() => handleCardClick(iskanje.id)}>
                                <Card.Body>
                                    <Card.Title>{iskanje.name}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Body>{iskanje.creationDate}</Card.Body>
                                </Card.Footer>
                                <Badge bg="danger" className="badge-top-right">Vulnerable</Badge>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}    
export default RecentScans;
