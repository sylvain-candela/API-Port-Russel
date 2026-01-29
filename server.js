const http = require('http');
const app = require('./devoir-api-port-russell/app'); // On importe ton gros fichier app.js
const cookieSession = require('cookie-session');

// 1. Gestion du port dynamique pour Render
const port = process.env.PORT || 8000;
app.set('port', port);

// 2. Ajout des sessions (vu que tu en as besoin)
app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

// 3. Création du serveur HTTP
const server = http.createServer(app);

server.listen(port);

server.on('error', (error) => {
    console.error("Erreur serveur : ", error);
});

server.on('listening', () => {
    console.log('🚀 Le serveur complet est en ligne sur le port ' + port);
});