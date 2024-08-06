// models/Account.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Schéma pour le carnet de tontine
const CategorieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategorieCompte = mongoose.model('CategorieCompte', CategorieSchema);
module.exports = CategorieCompte;
