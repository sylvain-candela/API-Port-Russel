const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'votre_cle_de_secours_tres_longue';

exports.checkJWT = async (req, res, next) => {
    
    let token = req.headers['w-access-token'] || req.headers['authorization'] || (req.cookies ? req.cookies.token : null);

    
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                
                return res.status(401).json('token_not_valid');
            } else {
                req.decoded = decoded;
                const expireIN = 24 * 60 * 60;
                const newToken = jwt.sign(
                    { user: decoded.user },
                    SECRET_KEY,
                    { expiresIn: expireIN }
                );

                res.setHeader('Authorization', 'Bearer ' + newToken);
                next();
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
};