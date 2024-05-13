import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailInput.css'; 
import { Button } from 'react-bootstrap';
const EmailInput = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate('/register/password', { state: { email } });
    }

    return (
        <div className="container" style={{ maxWidth: "40%" }}>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card p-3">
                        <h2 className="mb-3">Create your account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your email" />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Continue</button>
                            </div>
                            <Button variant="primary" href="/login">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailInput;
