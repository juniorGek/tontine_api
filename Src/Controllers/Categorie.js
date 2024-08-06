const CategorieCompte = require("../models/CategorieCompte");



class Categorie{
    static addCategorie = async(req,res) => {
        try {
            const { user } = req.user; // Assuming userType is a field in the decoded token
            console.log(user)
            if (user!== 'Admin' && user!== 'superAdmin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            }

            const {name, description } = req.body;
            const categorie = new CategorieCompte({ name, description });
            await categorie.save();
            return res.status(201).json({message: 'COMPTE CREER'});

        } catch (error) {
            return res.status(404).json({message: 'error creating category', error: error.message});
        }
    };

    
    static getAllCategories = async(req,res) => {
        try {
            const { user } = req.user; // Assuming userType is a field in the decoded token
            if (user!== 'Admin' && user!== 'superAdmin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            }
            const categories = await CategorieCompte.find({ enabled: true });
            return res.status(200).json({categories});
        } catch (error) {
            return res.status(400).json({message: 'error getting categories', error: error.message});
        }
    }


}


module.exports = Categorie;