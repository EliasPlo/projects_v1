import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        };
        fetchUsers();
    }, [token]);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/delete-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Manage Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} - {user.iban} - {user.balance} €
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
