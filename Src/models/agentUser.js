const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Adresse e-mail invalide'
        }
    },
    password: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        unique: true,
        required: true
    },
    identite:{
        type: String,
        required: true,
        unique:true,
    },
    description: {
        type: String,
    },
    genre: {
        type: String,
    },
    profile: {
        type: String,
    },
    zone: {
        type: [String],
        required: true
    },
    enabled: {
        type: Boolean,
        default: false,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    }
});

// Middleware de pré-enregistrement pour hacher le mot de passe
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});


// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('agent', userSchema);
