import { connect } from 'mongoose';

export async function initClientDbConnection() {
    try {
        await connect(process.env.MONGODB_URI); 
        console.log('Connexion à MongoDB réussie !');

    } catch (error) {
        console.log('Connexion à MongoDB échouée :', error);
    }
}