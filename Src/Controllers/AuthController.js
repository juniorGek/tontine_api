const User = require('../models/user')
const jwt = require('jsonwebtoken');

// Fonction de génération de mot de passe aléatoire
function generateRandomPassword(length = 10) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}



class AuthController {

    static register = async (req, res) => {
        try {
            const { user } = req.user; // Assuming userType is a field in the decoded token
            console.log(user)
            if (user !== 'Admin' && user !== 'superAdmin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            }
    
            const {nom, prenom, email, telephone, adresse,genre,description,identite,password, typeUser,enabled } = req.body;
            console.log(nom)
            const generatedPassword = password || generateRandomPassword();
            console.log(generatedPassword);

            // Assuming you have a User model and hashing logic for the password
            const newUser = new User({ email, password:generatedPassword, typeUser, nom,prenom,telephone,adresse,genre,description,identite,enabled});
            await newUser.save();
    
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ message: 'Registration failed', error: error.message });
        }
    };


    static login = async (req,res) => {
        try {
            const {email, password} = req.body;
            console.log(email, password);
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: "Email ou mot de passe incorrect"});
            }
            if(user.typeUser !=="Admin" && user.typeUser !=="superAdmin" ){
                return res.status(403).json({ message: 'Access Denied' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }

            const token = jwt.sign({ id: user._id , user:user.typeUser, nom: user.nom}, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({token});
        } catch (error) {
            return res.status(400).json({message: "login failed", error: error.message});
        }
    }

    static user = async(req, res) => {
        try {
            const user = await User.find();
            return res.status(200).json({user});
        } catch (error) {
            return res.status(400).json({message: "user not found", error: error.message});
        }
    };
}


module.exports = AuthController;