const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Tilisiirto
router.post('/transfer', async (req, res) => {
    const { fromUserId, toIban, amount } = req.body;
    try {
        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findOne({ iban: toIban });
        if (!toUser || fromUser.balance < amount) return res.status(400).json({ error: "Invalid transfer" });

        fromUser.balance -= amount;
        toUser.balance += amount;

        await fromUser.save();
        await toUser.save();

        const transaction = new Transaction({ fromUser: fromUser._id, toUser: toUser._id, amount });
        await transaction.save();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        res.status(500).json({ error: "Transfer failed" });
    }
});

module.exports = router;
