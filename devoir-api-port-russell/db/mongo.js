import { connect } from 'mongoose';

export async function initClientDbConnection() {
    try {
        await connect(process.env.URL_MONGO); 
        console.log('Connexion à MongoDB réussie !');

    } catch (error) {
        console.log('Connexion à MongoDB échouée :', error);
    }
}