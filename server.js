const express = require('express');
const app = express();
const port = 8000;

var cookieSession = require('cookie-session');
app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.get('/', function (req,res,next){
    req.session.views = (req.session.views || 0) + 1
    res.end(req.session.views + ' views')
})
app.get('/html', (req,res) => {
    res.type('texte/html');
    res.send('<h1>hello World</h1>')
})

app.listen(port,() => {
    console.log('serveur à l/écoute ' + port);
})