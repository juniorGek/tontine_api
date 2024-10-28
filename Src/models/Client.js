// models/Client.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  datNaiss: {
    type: Date,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    unique: true,
  },
  cni: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'agent',
  },
  typeCompte: {
    type: Schema.Types.ObjectId,
    ref: 'CategorieCompte',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  etatInscription: {
    type: String,
    enum: ['en attente', 'valide', 'refuse'],
    default: 'en attente',
  },
  enabled: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// Middleware `pre-save` pour mettre `nom` en majuscules
ClientSchema.pre('save', function (next) {
  this.nom = this.nom.toUpperCase();
  next();
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
