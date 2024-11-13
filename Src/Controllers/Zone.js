const Zone = require("../models/Zone");
const zoneSchema = require("../Validator/ZoneValidator");


class ZoneController {

    static addZone= async(req, res) => {
        
            try {
              const validZone = zoneSchema.parse(req.body);
              const newZone = new Zone(validZone);
              await newZone.save();
              
              res.status(200).json({ message: 'Zone créée avec succès', data: newZone });
            } catch (error) {
              res.status(400).json({ message: 'Validation des données échouée', errors: error.errors });
            }          
    }

    static listeZone = async(req, res) => {
        try {
            const listeZone = await Zone.find({enabled: true});
            res.status(200).json({listeZone: listeZone});
        } catch (error) {
            res.status(400).json({ message: 'Erreur', errors: error.message });
        }
    }

}


module.exports = ZoneController;