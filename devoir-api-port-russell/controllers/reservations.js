const Reservation = require('../models/reservation');

exports.add = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const newReservations = await Reservation.insertMany(req.body);
            return res.status(201).json({
                message: `${newReservations.length} reservations ont été ajoutées !`,
                data: newReservations
            });
        } else {
            const reservation = new Reservation(req.body);
            await reservation.save();
            return res.status(201).json(reservation);
        }
    } catch (error) {
        res.status(400).json({ 
            message: "Erreur lors de l'insertion", 
            error: error.message 
        });
    }
};

exports.getAllReservations = (req, res) => {
    Reservation.find()
        .then(reservations => res.status(200).json(reservations))
        .catch(error => res.status(400).json({ error }));
};

exports.getByCatway = (req, res) => {
    Reservation.find({ catwayNumber: req.params.id })
        .then(reservations => res.status(200).json(reservations))
        .catch(error => res.status(400).json({ error }));

    Reservation.findOne({ _id: req.params.id })
        .then(reservation => res.status(200).json(reservation))
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