const Catway = require('../models/catway');

exports.add = async (req, res) => {
    try {
        const catway = new Catway(req.body);
        await catway.save();
        res.status(201).json({
            message: "Catway créé avec succès !",
            data: catway
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Erreur lors de la création du catway", 
            error: error.message 
        });
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