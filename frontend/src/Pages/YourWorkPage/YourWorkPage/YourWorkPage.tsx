// YourWorkPage.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import { useAuth } from '../../../context/AuthContext';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import CardGroup from 'react-bootstrap/CardGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./YourWorkPage.css"
interface Iskanje {
    id: string;
    ime: string;
}

const YourWorkPage = () => {
    const { user} = useAuth();
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
    }, []);

    return (
        <>
  
  <Container className="work-page-container">
                <h2 className="text-left">G'day, {user?.email}</h2>
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-left">Your recent scans</h2>
                    </Col>
                </Row>
                <Row>
                    {iskanja.map(iskanje => (
                        <Col key={iskanje.id} xs={12} sm={6} md={4} lg={3}>
                            <Card 
                                className="mb-4 card-custom" 
                                onClick={() => alert(`You clicked on ${iskanje.ime}`)} 
                                style={{ height: '150px', width: '200px' }}
                            >
                                <Card.Body className="d-flex justify-content-center align-items-center">
                                    <Card.Text>{iskanje.ime}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default YourWorkPage;