import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Bank App</h1>
            <p>Your online banking solution for easy money management.</p>
            <h2>Features</h2>
            <ul>
                <li>Transfer money between accounts</li>
                <li>Apply for loans</li>
                <li>View transaction history</li>
                <li>Admin controls for managing accounts</li>
            </ul>
            <div>
                <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Home;
