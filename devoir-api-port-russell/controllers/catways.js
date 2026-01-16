const Catway = require('../models/catway');

exports.add = async (req, res) => {
    try {
        const lastCatway = await Catway.findOne().sort('-catwayNumber');

        const nextNumber = lastCatway ? lastCatway.catwayNumber + 1 : 1;

        const catwayData = {
            ...req.body,
            catwayNumber: nextNumber
        };

        const catway = new Catway(catwayData);
        await catway.save();

        res.redirect('/catways');
    } catch (error) {
        res.status(400).render('error', { message: error.message });
    }
};

exports.getAddForm = async (req, res) => {
    try {
        
        const user = req.user;

        res.render('catways-add', { 
            user: user,
            title: "Ajouter un Catway"
        });
    } catch (error) {
        res.redirect('/dashboard');
    }
};

exports.getAllCatways = (req, res) => {
    Catway.find()
        .then(catways => {
            res.render('catways', { catways: catways });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getOneCatway = (req, res) => {
    Catway.findOne({ _id: req.params.id })
        .then(catway => res.status(200).json(catway))
        .catch(error => res.status(404).json({ error }));
};


exports.modifyCatway = (req, res) => {
    Catway.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Catway modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteCatway = (req, res) => {
    Catway.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Catway supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};