const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Käyttäjän tietojen muokkaus (admin)
router.put('/edit-user/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.json({ message: "User updated", user });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

module.exports = router;
