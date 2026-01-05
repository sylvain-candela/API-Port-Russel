const express = require('express');
const app = express();
const port = 3000

app.get('/' ,(req,res) => {
    res.type( 'texte/plain' )
    res.send('Serveur  Bienvenue sur mon serveur perso express')
})

app.get('/about' ,(req,res) => {
    res.type( 'texte/plain' )
    res.send('je suis une application express')
})

app.use('/' ,(req,res) => {
    res.type( 'texte/plain' )
    res.status(404)
    res.send('404 page non trouvée')
})

app.use(function(req,res, next) {
    console.error(err.stack);
    res.status(500).send("une erreur s'est produite !");
});

app.listen (port, () => {
    console.log(`l'Application écoute sur le port ${port}`)
});

