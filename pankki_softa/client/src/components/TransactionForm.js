import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [toIban, setToIban] = useState('');
    const [amount, setAmount] = useState('');
    const token = localStorage.getItem('token');

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/account/transfer',
                { toIban, amount: parseFloat(amount) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Transfer successful');
        } catch (error) {
            alert('Transfer failed');
        }
    };

    return (
        <form onSubmit={handleTransfer}>
            <h2>Make a Transfer</h2>
            <input type="text" placeholder="Recipient IBAN" value={toIban} onChange={(e) => setToIban(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button type="submit">Transfer</button>
        </form>
    );
};

export default TransactionForm;
