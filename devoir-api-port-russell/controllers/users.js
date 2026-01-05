const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

exports.getById = async (req, res, next) => {
    const id = req.params.id

    try{
        let user = await User.findById(id);

        if(user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error){
        return res.status(501).json (error);
    }
}

exports.add = async (req,res, next) => {
    
    const temp = ({
    name : req.body.name,
    firstname : req.body.firstname,
    email :req.body.email,
    password :req.body.password
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        console.log("Détail de l'erreur :", error);
        return res.status(501).json(error);
    }
}

exports.update = async (req,res, next) =>{
    const id = req.params.id
    const temp = ({
        name : req.body.name,
        firstname : req.body.firstname,
        email :req.body.email,
        password :req.body.password
    });

    try{
        let user = await User.findOne({_id : id});

        if(user){
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req,res, next) => {
    const id = req.params.id

    try {
        await User.deleteOne({ _id: id});

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.authenticate = async (req,res, next) => {
    const { email,password } = req.body;

    try{
        let user = await User.findOne({email: email}, '-__v -createdAt -updatedAt');

        if(user){
            bcrypt.compare(password, user.password, function(err, response){
                if(err) {
                    throw new Error(err);
                }
                if(response){
                    delete user._doc.password;

                    const expireIN = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIN
                    });
                    res.header('Authorization', 'Bearer ' + token);

                    return res.status(200).json({ message:'authenticate_succeed', token: token});
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error){
        return res.status(501).json(error);
    }
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json ({ error }));
}

exports.login = (req,res, next) => {
    User.findOne ({ email : req.body.email })
    .then( user => {
        if(user){
            return res.status(401).json({ error: 'Utilisateur non trouvé'})
        }

        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({error : 'Mot de passe incorrect'});
            }

            return res.status(200).json ({
                userId: user._id,
            });
        })
        .catch(error => res.status(500).json ({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};