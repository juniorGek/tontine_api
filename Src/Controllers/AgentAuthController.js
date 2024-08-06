const Agent = require('../models/agentUser');




function generateRandomPassword(length = 10) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}



class AgentAuthController {

    static AgentRegister = async(req, res) => {
        try {
            const { user } = req.user; // Assuming userType is a field in the decoded token
            console.log(user)
            if (user !== 'Admin' && user !== 'superAdmin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            }
    
            const { nom, prenom, email, telephone, adresse, genre, description, identite, password, zone } = req.body;
            console.log(nom)
            const generatedPassword = password || generateRandomPassword();
            console.log(generatedPassword);

            // Assuming you have a User model and hashing logic for the password
            const newUser = new Agent({ email, password:generatedPassword, nom,prenom,telephone,adresse,genre,description,zone,identite});
            await newUser.save();
    
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ message: 'Registration failed', error: error.message });
        }
    };


    static listeAgent = async(req, res) => {
        try {
            const { user } = req.user; // Assuming userType is a field in the decoded token
            console.log(user)
            if (user!== 'Admin' && user!== 'superAdmin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            }
            const listeAgent = await Agent.find().select('-password');;
            return res.status(200).json({listeAgent});

        }catch (error) {
            return res.status(400).json({message: "agent not found", error: error.message});
        }
    };


    static detailsAgent = async(req, res) => {
        const userId = req.params.id;

        // Rechercher l'utilisateur dans la base de données
        const user = await Agent.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
        
    };

    static listeAgentAssigned = async(req, res) => {
        try {
            const { user } = req.user; // Assuming userType is a field in the decoded token
            console.log(user)
            if (user!== 'Admin' && user!== 'superAdmin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            }
            const listeAgent = await Agent.find().select('nom prenom _id zone');
            return res.status(200).json({listeAgent});

        }catch (error) {
            return res.status(400).json({message: "agent not found", error: error.message});
        }
    };



}


module.exports = AgentAuthController;