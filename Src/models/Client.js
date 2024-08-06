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
  adresse: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    unique:true
  },
  cni: {
    type: String,
    required: true,
    unique:true,
  },
  genre:{
    type: String,
    required: true,
  },
  note:{
    type: String,
    required: true,
  },
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'agent',
    required: true,
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
  enabled:{
    type: Boolean,
    default: true,
    required: true,
  }
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
