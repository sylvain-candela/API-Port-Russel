const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

exports.add = async (req, res) => {
    try {
        const lastCatway = await Catway.findOne().sort('-catwayNumber');
        
        let nextNumber = "1"; 
        if (lastCatway && lastCatway.catwayNumber) {
            nextNumber = (parseInt(lastCatway.catwayNumber, 10) + 1).toString();
        }

        const reservationData = {
            catwayNumber: nextNumber, 
            clientName: req.body.clientName, 
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        const reservation = new Reservation(reservationData);  
        await reservation.save();

      
        return res.redirect('/reservations');

    } catch (error) {
        console.error("ERREUR VALIDATION :", error);
       
        res.status(400).send(`Erreur : ${error.message}`);
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



exports.modifyReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const { clientName } = req.body;
        const { boatName } = req.body;
        const { startDate } = req.body;
        const { endDate } = req.body;

      await Reservation.findByIdAndUpdate(id, { 
            clientName, 
            boatName, 
            startDate, 
            endDate 
        });

        res.redirect('/reservations'); 
    } catch (error) {
        res.status(400).send("Erreur lors de la modification");
    }
};

exports.deleteReservation = (req, res) => {
    Reservation.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'reservation supprimée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.renderEditForm = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).send("Réservation non trouvée");
        
        res.render('reservations-edit', { reservation }); 
    } catch (error) {
        res.status(500).send("Erreur serveur");
    }
};