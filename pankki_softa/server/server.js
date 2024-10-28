// server.js

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const loanRoutes = require('./routes/loan');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ympäristömuuttujat
const PORT = process.env.PORT || 5000;

// Luo Express-sovellus
const app = express();

// Yhdistä MongoDB-tietokantaan
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Reitit
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/admin', adminRoutes);

// Rekisteröintireitti
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // Hashataan salasana
    const hashedPassword = await bcrypt.hash(password, 10);

    const User = mongoose.model('User', new mongoose.Schema({
        username: { type: String, unique: true },
        password: String,
    }));

    const user = new User({ username, password: hashedPassword });

    try {
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});

// Kirjautumisreitti
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const User = mongoose.model('User', new mongoose.Schema({
        username: { type: String, unique: true },
        password: String,
    }));

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid credentials');
    }

    // Luo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

// Alustetaan palvelin
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
