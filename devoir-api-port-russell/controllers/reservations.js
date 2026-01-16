const Reservation = require('../models/reservation');

exports.add = async (req, res) => {
    try {
        
        const reservation = new Reservation(req.body);
        
        await reservation.save();
    
        res.status(201).json({
            message: "Reservation créé avec succès !",
            data: reservation
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Erreur lors de la création du reservation", 
            error: error.message 
        });
    }
};

exports.getAllReservations = (req, res) => {
    Reservation.find()
        .then(reservations => {
            return res.render('reservations', { reservations: reservations });
        })
        .catch(error => {
            console.error(error);
            return res.status(400).send("Erreur lors du chargement des réservations");
        });
};

exports.getByReservation = (req, res) => {
    Reservation.findOne({ _id: req.params.id })
        .then(reservation => {
            if (!reservation) {
                return res.status(404).json({ message: "Réservation non trouvée" });
            }
            return res.status(200).json(reservation);
        })
        .catch(error => res.status(404).json({ error }));
};


exports.modifyReservation = (req, res) => {
    Reservation.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'reservation modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteReservation = (req, res) => {
    Reservation.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'reservation supprimée !' }))
        .catch(error => res.status(400).json({ error }));
};