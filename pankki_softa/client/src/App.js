import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import LoanForm from './components/LoanForm';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/transfer" element={<TransactionForm />} />
                <Route path="/loan" element={<LoanForm />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
}

export default App;
