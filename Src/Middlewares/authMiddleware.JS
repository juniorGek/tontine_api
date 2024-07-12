const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Accès refusé, en-tête Authorization manquant' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Format d\'en-tête Authorization invalide' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            
            return res.status(401).json({ message: 'Token expiré' });
        }
        if (error.name === 'JsonWebTokenError') {
            
            return res.status(401).json({ message: 'Token invalide' });
        }
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

module.exports = authMiddleware;
