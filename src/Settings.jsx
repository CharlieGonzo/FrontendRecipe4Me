import React, { useState } from 'react';
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const Settings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || {};

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Settings Saved:', { username, email, password });
        // Add logic to save settings, e.g., API call
    };

    const handleBack = () => {
        history.push('/'); // Navigate back to home or specify the route you want
    };

    return (
        <div className="settings-background d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card shadow" style={{ width: '40rem', borderRadius: '15px' }}>
                <div className="card-body">
                    <h1 className="text-center mb-4">Settings</h1>
                    <form onSubmit={handleSave}>
                        <div className="form-group mb-4">
                            <label htmlFor="username" className="form-label">
                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="email" className="form-label">
                                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="form-label">
                                <FontAwesomeIcon icon={faLock} className="me-2" />
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-danger w-100" style={{ borderRadius: '5px' }}>
                            <FontAwesomeIcon icon={faSave} className="me-2" />
                            Save Changes
                        </button>
                    </form>
                    <div className="text-center text-white mt-3">
                        Your changes will be saved automatically.
                    </div>
                    <button className="btn btn-light w-100 mt-3" onClick={()=>{navigate("/Home",{state:{username}})}} style={{ borderRadius: '5px' }}>
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                        Back Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
