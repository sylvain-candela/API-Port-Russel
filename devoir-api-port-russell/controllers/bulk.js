const User = require('../models/user');
const Catways = require('../models/catway');
const Reservation = require('../models/reservation');

const models = {
    user: User,
    catway: Catways,
    reservation: Reservation
};

exports.bulkData = async( req,res) => {
    try {
        const { type } = req.params;
        const Model = models[type];
        console.log("Valeur de type :", type);
        console.log("Contenu de Model :", Model);

        if(!Model){
            return res.status(404).json({message : "Modèle non trouvé" });
        }

        if(Array.isArray(req.body)){
            const results = await Model.insertMany(req.body);
            return res.status(201).json({
                message: `${results.length} ${type}s ajoutés avec succés`,
                data: results
            });
        } else {
            const newItem = new Model(req.body);
            await newItem.save();
            return res.status(201).json(newItem);
        }
    } catch (error){
        console.error("Détail:", error.message);
        res.status(400).json({
            message: "Erreur lors de l'opération",
            error: error.message
        });
    }
}

exports.bulkDelete = async (req,res) => {
    try {
        const { type } = req.params;
        const Model = models[type];
        const filter = req.body.ids ? { _id: { $in: req.body.ids }} :{};
        const results = await Model.deleteMany(filter);

        res.status(200).json({
            message: `${results.deletedCount} éléments supprimés`
        });
    } catch (error) {
        console.error("Détail:", error.message);
        res.status(400).json({error : error.message});
    }
};

