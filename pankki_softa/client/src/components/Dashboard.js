import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountData = async () => {
            if (!token) {
                navigate('/login'); // Ohjataan käyttäjä kirjautumissivulle
                return;
            }
            
            try {
                const response = await axios.get('http://localhost:5000/api/account/balance', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalance(response.data.balance);

                const transactionsResponse = await axios.get('http://localhost:5000/api/account/transactions', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(transactionsResponse.data);
            } catch (error) {
                console.error("Error fetching account data:", error);
                navigate('/login'); // Ohjataan takaisin kirjautumissivulle, jos API-kutsu epäonnistuu
            }
        };
        
        fetchAccountData();
    }, [token, navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Balance: {balance} €</h2>
            <Link to="/transfer">Make a Transfer</Link> | <Link to="/loan">Apply for a Loan</Link> | <Link to="/">Home</Link>

            <h3>Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.date}: {transaction.fromUser} sent {transaction.amount} € to {transaction.toUser}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
