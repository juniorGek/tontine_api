const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true }, // success or failure
    message: { type: String, required: true } // reason for failure
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
