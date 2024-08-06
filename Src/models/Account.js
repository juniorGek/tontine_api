// models/Account.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


// Schéma pour le carnet de tontine
const AccountSchema = new Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  defaultContribution: {
    type: Number,
    required: true,
  },
  tel:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Middleware de pré-enregistrement pour hacher le mot de passe
AccountSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword; // Mettez à jour le mot de passe haché
    } catch (error) {
      return next(error);
    }
  }
  next();
});



const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
