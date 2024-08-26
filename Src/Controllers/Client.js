const generateAccountNumber = require("../Components/generateAccount");
const generateRandomPassword = require("../Components/generatePassword");
const Account = require("../models/Account");
const Client = require("../models/Client");

class Clients {

  static addClient = async (req, res) => {
    const { user } = req.user; // Assuming userType is a field in the decoded token
    console.log(user);
    if (user !== "Admin" && user !== "superAdmin" && user !== "caisse") {
      return res
        .status(403)
        .json({ message: "Access Denied: Insufficient Privileges" });
    }
    /* const { nom, prenom, email, tel, adresse, genre, note, cni, agentId, compte } = req.body; */
    try {
      const accountNumber = generateAccountNumber();

      const existClient = await Client.findOne({
        $or: [
          { email: req.body.email },
          { tel: req.body.tel },
          { cni: req.body.cni },
        ],
      });

      if (existClient) {
        return res.status(400).json({ message: "Client already exist" });
      }
      const client = new Client(req.body);
      const pass = generateRandomPassword();
      client.save();

      const account = await Account({
        accountNumber: accountNumber,
        clientId: client._id,
        defaultContribution: req.body.montant,
        tel: req.body.tel,
        password: pass,
      });
      account.save();

      console.log(account, client);
      return res.json({ message: account, compte:accountNumber });
    } catch (error) {
      console.error(error);
      return res.json({
        errors: error.message,
        message: "Error to register client",
      });
    }
  };


  static clientRegister = async(req, res)=>{
    console.log(req.body);
    try {
      const existClient = await Client.findOne({
        $or: [
          { email: req.body.email },
          { tel: req.body.tel },
          { cni: req.body.cni },
        ],
      });
      if (existClient) {
        return res.status(400).json({ message: "Client already exist" });
      }
      const client = new Client(req.body);
      client.enabled = false;
      await client.save();
      return res.status(200).json({ message: "Client created" });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: "Client not created", error: error.message });
    }
    
  }

  static waitList= async (req, res)=> {

    try {
      const { user } = req.user; // Assuming userType is a field in the decoded token
      console.log(user);
      if (user !== "Admin" && user !== "superAdmin" && user !== "caisse") {
        return res
          .status(403)
          .json({ message: "Access Denied: Insufficient Privileges" });
      }

      const client = await Client.find({ enabled: false }).sort({ createdAt: -1 });
      return res.status(200).json({ client });

    } catch (error) {
        return res.json({
          errors: error.message,
          message: "Error to register client",
        });
    }


  }

  static detailWaitClient=async (req, res) => {
    const userId = req.params.id;

        // Rechercher l'utilisateur dans la base de données
        const user = await Client.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
  }


}

module.exports = Clients;
