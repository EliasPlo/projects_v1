const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const User = require('../models/User');

// Lainan haku
router.post('/apply', async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const loan = new Loan({ user: userId, amount, status: 'pending' });
        await loan.save();
        res.json({ message: "Loan application submitted" });
    } catch (error) {
        res.status(500).json({ error: "Loan application failed" });
    }
});

// Lainan hyväksyntä (admin)
router.post('/approve', async (req, res) => {
    const { loanId, toUserId } = req.body;
    try {
        const loan = await Loan.findById(loanId);
        const user = await User.findById(toUserId);
        
        if (!loan || loan.status !== 'pending') return res.status(400).json({ error: "Invalid loan approval" });
        
        loan.status = 'approved';
        user.balance += loan.amount;

        await loan.save();
        await user.save();

        res.json({ message: "Loan approved and credited to user's account" });
    } catch (error) {
        res.status(500).json({ error: "Loan approval failed" });
    }
});

// Lainan maksaminen
router.post('/repay', async (req, res) => {
    const { userId, loanId, amount } = req.body;
    try {
        const loan = await Loan.findById(loanId);
        const user = await User.findById(userId);

        if (!loan || loan.status === 'repaid' || user.balance < amount) {
            return res.status(400).json({ error: "Invalid loan repayment" });
        }

        user.balance -= amount;
        loan.amount -= amount;

        if (loan.amount <= 0) loan.status = 'repaid';

        await loan.save();
        await user.save();

        res.json({ message: "Loan repaid" });
    } catch (error) {
        res.status(500).json({ error: "Repayment failed" });
    }
});

module.exports = router;
