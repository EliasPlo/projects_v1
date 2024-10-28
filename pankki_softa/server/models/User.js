const mongoose = require('mongoose');
const IBAN = require('./IBAN'); // Tuo IBAN-malli

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 1000 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

userSchema.post('save', async function(doc) {
    // Generoi IBAN käyttäjälle tallentamisen jälkeen
    const iban = generateIBAN();
    await IBAN.create({ iban, userId: doc._id }); // Luo uusi IBAN tietokantaan
});

// IBAN-generaattori
const generateIBAN = () => {
    const countryCode = 'FI';
    const bankCode = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    return countryCode + bankCode.padEnd(16, '0');
};

module.exports = mongoose.model('User', userSchema);
