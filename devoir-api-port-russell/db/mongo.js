const mongoose = require('mongoose');

const clientOptions = {
    dbName : 'apinode'
};

// Remplacez votre bloc actuel par celui-ci :
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO); 
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.log('Connexion à MongoDB échouée :', error);
    }
}