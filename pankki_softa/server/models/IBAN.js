const mongoose = require('mongoose');

const ibanSchema = new mongoose.Schema({
    iban: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Viittaa User-malliin
});

module.exports = mongoose.model('IBAN', ibanSchema);
