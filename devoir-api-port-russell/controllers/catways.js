const Catway = require('../models/catway');

exports.add = async (req, res) => {
    try {
        const lastCatway = await Catway.findOne().sort('-catwayNumber');

        const nextNumber = lastCatway ? lastCatway.catwayNumber + 1 : 1;
        
        const catwayData = {
            catwayNumber: parseInt(nextNumber, 10),
            catwayType: req.body.type, 
            catwayState: req.body.catwayState,
            description: req.body.description 
        };

        const catway = new Catway(catwayData);
        await catway.save();

        res.redirect('/catways');
        res.status(200).json({ message: 'Catway ajouté !' })
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
    Catway.find().sort('catwayNumber: 1')
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


exports.modifyCatway = async (req, res) => {
    try {
        const id = req.params.id;
        const { catwayState } = req.body;
        
        await Catway.findByIdAndUpdate(id, { catwayState });

        res.redirect('/catways'); 
    } catch (error) {
        res.status(400).send("Erreur lors de la modification");
    }
};

exports.deleteCatway = (req, res) => {
    Catway.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Catway supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.renderEditForm = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).send("Catway non trouvé");
        
        res.render('catways-edit', { catway }); 
    } catch (error) {
        res.status(500).send("Erreur serveur");
    }
};