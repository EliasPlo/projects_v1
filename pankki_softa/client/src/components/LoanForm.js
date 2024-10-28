import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = () => {
    const [amount, setAmount] = useState('');
    const token = localStorage.getItem('token');

    const handleLoanRequest = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/loan/apply',
                { amount: parseFloat(amount) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Loan application submitted');
        } catch (error) {
            alert('Loan application failed');
        }
    };

    return (
        <form onSubmit={handleLoanRequest}>
            <h2>Apply for a Loan</h2>
            <input type="number" placeholder="Loan Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button type="submit">Apply</button>
        </form>
    );
};

export default LoanForm;
